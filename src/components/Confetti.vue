<template>
  <div class="confetti-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface ConfettiOptions {
  particleCount?: number
  spread?: number
  origin?: { x: number; y: number }
  colors?: string[]
  disableForReducedMotion?: boolean
}

const props = withDefaults(defineProps<{
  options?: ConfettiOptions
}>(), {
  options: () => ({
    particleCount: 100,
    spread: 70,
    origin: { x: 0.5, y: 0.5 },
    colors: ['#c9a86c', '#d4b896', '#8b7355', '#a08060', '#e8d5b7'],
    disableForReducedMotion: true,
  }),
})

const fire = (x?: number, y?: number) => {
  // 检查用户是否偏好减少动画
  if (props.options.disableForReducedMotion && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  const defaults = {
    particleCount: props.options.particleCount,
    spread: props.options.spread,
    origin: x !== undefined && y !== undefined ? { x, y } : props.options.origin,
    colors: props.options.colors,
    disableForReducedMotion: props.options.disableForReducedMotion,
    scalar: 1.2,
    shapes: ['circle', 'square'] as const,
    ticks: 100,
    gravity: 1.2,
    drift: 0,
    startVelocity: 45,
  }

  // 创建 confetti
  createConfetti(defaults)
}

const createConfetti = (options: any) => {
  const particles: HTMLDivElement[] = []
  const container = document.createElement('div')
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    overflow: hidden;
  `
  document.body.appendChild(container)

  const { particleCount, spread, origin, colors, scalar, shapes, ticks, gravity, startVelocity } = options

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const size = (Math.random() * 8 + 4) * scalar
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${shape === 'circle' ? '50%' : '2px'};
      left: ${origin.x * 100}%;
      top: ${origin.y * 100}%;
      pointer-events: none;
    `
    
    container.appendChild(particle)
    particles.push(particle)

    // 计算初始速度和角度
    const angle = (Math.random() * spread - spread / 2) * (Math.PI / 180)
    const velocity = Math.random() * startVelocity + 20
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity - 10

    // 动画
    let posX = origin.x * window.innerWidth
    let posY = origin.y * window.innerHeight
    let velocityX = vx
    let velocityY = vy
    let opacity = 1
    let tick = 0

    const animate = () => {
      if (tick >= ticks) {
        particle.remove()
        return
      }

      velocityY += gravity * 0.1
      posX += velocityX * 0.1
      posY += velocityY * 0.1
      opacity = 1 - tick / ticks
      tick++

      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      particle.style.opacity = `${opacity}`
      particle.style.transform = `rotate(${tick * 10}deg)`

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  // 清理容器
  setTimeout(() => {
    container.remove()
  }, ticks * 16 + 1000)
}

// 暴露方法给父组件
defineExpose({
  fire,
})
</script>
