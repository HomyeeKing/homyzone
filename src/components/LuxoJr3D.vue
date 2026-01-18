<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { isDark } from '@/logics'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement>()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let lampGroup: THREE.Group
let lampShade: THREE.Group
let eyeLeft: THREE.Mesh
let eyeRight: THREE.Mesh
let pupilLeft: THREE.Mesh
let pupilRight: THREE.Mesh
let upperArm: THREE.Group
let lowerArm: THREE.Group
let base: THREE.Group

// Animation state
let isHopping = false
let mouse = new THREE.Vector2()
let targetRotation = 0
let currentRotation = 0
let clock = new THREE.Clock()

// Additional lights for glow effect
let bulbPointLight: THREE.PointLight
let glowSphere: THREE.Mesh

onMounted(() => {
  initThreeJS()
  createLuxoLamp()
  animate()
  setupEventListeners()
})

onUnmounted(() => {
  cleanup()
})

// Watch theme changes to update lamp color
watch(isDark, () => {
  updateLampColor()
})

function initThreeJS() {
  const container = containerRef.value
  if (!container) return

  // Scene
  scene = new THREE.Scene()

  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  )
  camera.position.set(0, 3, 8)
  camera.lookAt(0, 2, 0)

  // Renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  container.appendChild(renderer.domElement)

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 10, 5)
  directionalLight.castShadow = true
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  scene.add(directionalLight)

  // Spotlight from lamp (will be toggled)
  const spotLight = new THREE.SpotLight(0xffdd44, 1, 10, Math.PI / 4, 0.5, 1)
  spotLight.position.set(0, 4, 0)
  spotLight.castShadow = true
  spotLight.name = 'lampLight'
  scene.add(spotLight)

  // Handle resize
  window.addEventListener('resize', onWindowResize)
}

function createLuxoLamp() {
  lampGroup = new THREE.Group()

  // Lamp materials
  const blueMaterial = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    metalness: 0.3,
    roughness: 0.4,
  })
  const grayMaterial = new THREE.MeshStandardMaterial({
    color: 0x666666,
    metalness: 0.5,
    roughness: 0.5,
  })
  const whiteMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.0,
    roughness: 0.1,
  })

  // Base
  base = new THREE.Group()
  const basePlate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 0.1, 32),
    grayMaterial
  )
  basePlate.castShadow = true
  basePlate.receiveShadow = true

  const baseBottom = new THREE.Mesh(
    new THREE.CylinderGeometry(1.4, 1.5, 0.15, 32),
    grayMaterial
  )
  baseBottom.position.y = -0.1
  baseBottom.receiveShadow = true

  // Feet
  const footGeom = new THREE.CapsuleGeometry(0.15, 0.8, 4, 8)
  const foot1 = new THREE.Mesh(footGeom, grayMaterial)
  foot1.rotation.z = Math.PI / 2
  foot1.position.set(-0.8, -0.15, 0)
  foot1.castShadow = true

  const foot2 = new THREE.Mesh(footGeom, grayMaterial)
  foot2.rotation.z = Math.PI / 2
  foot2.position.set(0.8, -0.15, 0)
  foot2.castShadow = true

  base.add(basePlate, baseBottom, foot1, foot2)

  // Ground spill light (light hitting the desk surface)
  const groundLight = new THREE.PointLight(0xffdd44, 0.5, 4, 2)
  groundLight.position.set(0, 0.1, 0)
  groundLight.name = 'groundLight'
  base.add(groundLight)

  lampGroup.add(base)

  // Lower arm (connects base to upper joint)
  lowerArm = new THREE.Group()
  lowerArm.position.y = 0.5

  const lowerArmSegment = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 2, 16),
    grayMaterial
  )
  lowerArmSegment.castShadow = true
  lowerArm.add(lowerArmSegment)

  // Joint 1 (between lower and upper arm)
  const joint1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    grayMaterial
  )
  joint1.position.y = 1
  lowerArm.add(joint1)

  lampGroup.add(lowerArm)

  // Upper arm (connects to shade)
  upperArm = new THREE.Group()
  upperArm.position.set(0, 1, 0)

  const upperArmSegment = new THREE.Mesh(
    new THREE.CylinderGeometry(0.08, 0.08, 1.8, 16),
    grayMaterial
  )
  upperArmSegment.rotation.z = -0.3
  upperArmSegment.castShadow = true
  upperArm.add(upperArmSegment)

  // Joint 2 (between arm and shade)
  const joint2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.15, 16, 16),
    grayMaterial
  )
  joint2.position.set(0.5, 0.8, 0)
  upperArm.add(joint2)

  lampGroup.add(upperArm)

  // Lamp shade
  lampShade = new THREE.Group()
  lampShade.position.set(0.8, 1.5, 0)
  lampShade.rotation.z = 0.3

  // Conical shade
  const shadeGeom = new THREE.ConeGeometry(0.8, 1, 32, 1, true)
  const shade = new THREE.Mesh(shadeGeom, blueMaterial)
  shade.rotation.x = Math.PI
  shade.position.y = 0.5
  shade.castShadow = true
  lampShade.add(shade)

  // Shade rim (bottom ring)
  const rimGeom = new THREE.TorusGeometry(0.8, 0.05, 16, 32)
  const rim = new THREE.Mesh(rimGeom, grayMaterial)
  rim.rotation.x = Math.PI / 2
  rim.position.y = 0
  lampShade.add(rim)

  // Light bulb (inside shade)
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshBasicMaterial({
      color: 0xffff88,
      transparent: true,
      opacity: isDark.value ? 0.3 : 0.9,
    })
  )
  bulb.position.y = 0.3
  bulb.name = 'bulb'
  lampShade.add(bulb)

  // Point light at bulb for ambient glow effect
  bulbPointLight = new THREE.PointLight(0xffdd44, 2.0, 5, 1)
  bulbPointLight.position.set(0, 0.5, 0)
  lampShade.add(bulbPointLight)

  // Glow sphere (halo effect around the bulb) - start invisible
  const glowGeom = new THREE.SphereGeometry(0.5, 32, 32)
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffff88,
    transparent: true,
    opacity: 0,  // Start completely invisible
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    depthWrite: false,
  })
  glowSphere = new THREE.Mesh(glowGeom, glowMat)
  glowSphere.position.y = 0.4
  glowSphere.scale.set(1, 1, 1)  // Start at normal scale
  glowSphere.visible = false  // Start completely hidden
  lampShade.add(glowSphere)

  // Eyes (make it cute!)
  const eyeWhiteGeom = new THREE.SphereGeometry(0.15, 16, 16)
  const pupilGeom = new THREE.SphereGeometry(0.08, 16, 16)

  // Left eye
  eyeLeft = new THREE.Mesh(eyeWhiteGeom, whiteMaterial)
  eyeLeft.position.set(-0.25, 0.7, 0.35)
  lampShade.add(eyeLeft)

  pupilLeft = new THREE.Mesh(pupilGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }))
  pupilLeft.position.z = 0.12
  eyeLeft.add(pupilLeft)

  // Right eye
  eyeRight = new THREE.Mesh(eyeWhiteGeom, whiteMaterial)
  eyeRight.position.set(0.25, 0.7, 0.35)
  lampShade.add(eyeRight)

  pupilRight = new THREE.Mesh(pupilGeom, new THREE.MeshBasicMaterial({ color: 0x000000 }))
  pupilRight.position.z = 0.12
  eyeRight.add(pupilRight)

  lampGroup.add(lampShade)

  scene.add(lampGroup)

  // Store materials for theme switching
  lampGroup.userData.blueMaterial = blueMaterial
  lampGroup.userData.grayMaterial = grayMaterial
}

function updateLampColor() {
  if (!lampGroup) return

  const shade = lampShade?.children.find(c => c.geometry?.type === 'ConeGeometry')
  if (shade && shade.material) {
    const mat = shade.material as THREE.MeshStandardMaterial
    mat.color.setHex(isDark.value ? 0x4B5563 : 0x2563eb)
  }

  // Update bulb opacity
  const bulb = lampShade?.children.find(c => c.name === 'bulb')
  if (bulb && bulb.material) {
    const mat = bulb.material as THREE.MeshBasicMaterial
    mat.opacity = isDark.value ? 0.2 : 0.9
  }

  // Update spotlight intensity
  const spotLight = scene.getObjectByName('lampLight') as THREE.SpotLight
  if (spotLight) {
    spotLight.intensity = isDark.value ? 0.3 : 1.5
    spotLight.color.setHex(isDark.value ? 0xffffaa : 0xffdd44)
  }

  // Update point light (bulb glow) - ONLY in dark mode
  if (bulbPointLight) {
    bulbPointLight.intensity = isDark.value ? 0.6 : 0
    bulbPointLight.color.setHex(isDark.value ? 0xffffaa : 0xffdd44)
    bulbPointLight.distance = isDark.value ? 3 : 0
  }

  // Update glow sphere - ONLY visible in dark mode
  if (glowSphere) {
    if (isDark.value) {
      glowSphere.visible = true
      const mat = glowSphere.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15
      glowSphere.scale.set(1.8, 1.8, 1.8)
    } else {
      glowSphere.visible = false
    }
  }

  // Update ground spill light - ONLY in dark mode
  const groundLight = scene.getObjectByName('groundLight') as THREE.PointLight
  if (groundLight) {
    groundLight.intensity = isDark.value ? 0.3 : 0
    groundLight.color.setHex(isDark.value ? 0xffffaa : 0xffdd44)
    groundLight.distance = isDark.value ? 3 : 0
  }
}

function setupEventListeners() {
  const container = containerRef.value
  if (!container) return

  // Mouse movement for eye tracking
  document.addEventListener('mousemove', onMouseMove)

  // Click to hop and toggle theme
  container.addEventListener('click', onLampClick)
}

function onMouseMove(event: MouseEvent) {
  const container = containerRef.value
  if (!container) return

  const rect = container.getBoundingClientRect()
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // Calculate target rotation for lamp body
  targetRotation = mouse.x * 0.3

  // Move pupils to follow mouse
  if (pupilLeft && pupilRight) {
    const pupilX = mouse.x * 0.08
    const pupilY = mouse.y * 0.08

    pupilLeft.position.x = pupilX
    pupilLeft.position.y = pupilY
    pupilRight.position.x = pupilX
    pupilRight.position.y = pupilY
  }

  // Make lamp shade head follow cursor direction
  if (lampShade) {
    // Calculate rotation to look at mouse position
    const targetRotationX = mouse.y * 0.5  // Look up/down
    const targetRotationY = mouse.x * 0.8  // Look left/right
    const targetRotationZ = -mouse.x * 0.2 // Slight tilt

    // Store target rotations for smooth animation in animate()
    lampShade.userData.targetRotationX = targetRotationX
    lampShade.userData.targetRotationY = targetRotationY
    lampShade.userData.targetRotationZ = targetRotationZ
  }
}

function onLampClick() {
  if (isHopping) return

  isHopping = true
  isDark.value = !isDark.value

  // Hop animation
  const hopDuration = 600
  const startTime = Date.now()

  const animateHop = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / hopDuration, 1)

    if (progress < 1) {
      // Hop trajectory using easing
      const hopHeight = Math.sin(progress * Math.PI) * 1.5
      const squash = Math.abs(Math.cos(progress * Math.PI)) * 0.1

      if (lampGroup) {
        lampGroup.position.y = hopHeight
        lampGroup.scale.y = 1 - squash
        lampGroup.scale.x = 1 + squash * 0.5
        lampGroup.scale.z = 1 + squash * 0.5
      }

      requestAnimationFrame(animateHop)
    } else {
      // Reset
      if (lampGroup) {
        lampGroup.position.y = 0
        lampGroup.scale.set(1, 1, 1)
      }
      isHopping = false
    }
  }

  animateHop()
}

function onWindowResize() {
  const container = containerRef.value
  if (!container || !camera || !renderer) return

  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

function animate() {
  requestAnimationFrame(animate)

  const delta = clock.getDelta()

  if (lampGroup && !isHopping) {
    // Smooth rotation towards mouse for body
    currentRotation += (targetRotation - currentRotation) * 0.05
    lampGroup.rotation.y = currentRotation

    // Smooth head/lamp shade rotation to follow cursor
    if (lampShade && lampShade.userData.targetRotationX !== undefined) {
      const lerpFactor = 0.08

      // Smoothly interpolate towards target rotations
      lampShade.rotation.x += (lampShade.userData.targetRotationX - lampShade.rotation.x) * lerpFactor
      lampShade.rotation.y += (lampShade.userData.targetRotationY - lampShade.rotation.y) * lerpFactor
      lampShade.rotation.z += ((lampShade.userData.targetRotationZ + 0.3) - lampShade.rotation.z) * lerpFactor
    } else {
      // Fallback idle animation if no target set yet
      const time = clock.getElapsedTime()
      lampShade.rotation.z = 0.3 + Math.sin(time * 0.5) * 0.05
      lampShade.rotation.x = Math.sin(time * 0.3) * 0.02
    }
  }

  // Blink animation
  const time = clock.getElapsedTime()
  if (eyeLeft && eyeRight) {
    const blinkScale = Math.sin(time * 1.5) > 0.98 ? 0.1 : 1
    eyeLeft.scale.y = blinkScale
    eyeRight.scale.y = blinkScale
  }

  renderer.render(scene, camera)
}

function cleanup() {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousemove', onMouseMove)

  if (renderer) {
    renderer.dispose()
  }
}
</script>

<template>
  <div
    ref="containerRef"
    class="fixed bottom-8 right-8 z-50 w-48 h-48 cursor-pointer"
    title="Click to toggle theme!"
  >
    <!-- Three.js canvas will be mounted here -->
  </div>
</template>

<style scoped>
/* 3D Luxo Jr styles */
</style>
