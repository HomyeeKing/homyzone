<template>
  <div @click="handleClick" class="click-confetti-wrapper">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  particleCount?: number
  colors?: string[]
}>(), {
  particleCount: 80,
  colors: () => ['#c9a86c', '#d4b896', '#8b7355', '#a08060', '#e8d5b7', '#f5e6d3'],
})

const handleClick = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height

  fireConfetti(e.clientX / window.innerWidth, e.clientY / window.innerHeight)
}

const fireConfetti = (originX: number, originY: number) => {
  // 检查用户是否偏好减少动画
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

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

  const { particleCount, colors } = props

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div')
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * 6 + 4
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${originX * 100}%;
      top: ${originY * 100}%;
      pointer-events: none;
    `
    
    container.appendChild(particle)

    // 计算爆炸方向
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 15 + 10
    const vx = Math.cos(angle) * velocity
    const vy = Math.sin(angle) * velocity - 8

    let posX = originX * window.innerWidth
    let posY = originY * window.innerHeight
    let velocityX = vx
    let velocityY = vy
    let opacity = 1
    let tick = 0
    const ticks = 60

    const animate = () => {
      if (tick >= ticks) {
        particle.remove()
        return
      }

      velocityY += 0.8
      posX += velocityX
      posY += velocityY
      opacity = 1 - tick / ticks
      tick++

      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      particle.style.opacity = `${opacity}`
      particle.style.transform = `rotate(${tick * 8}deg)`

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }

  setTimeout(() => {
    container.remove()
  }, 2000)
}
</script>

<style scoped>
.click-confetti-wrapper {
  cursor: pointer;
}
</style>
