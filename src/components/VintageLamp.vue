<script setup lang="ts">
import { ref, computed } from 'vue'
import { isDark } from '@/logics'
import { useWindowSize } from '@vueuse/core'

const isPulling = ref(false)
const ballY = ref(152)
const lineEndY = ref(150)

// 检测移动端
const { width } = useWindowSize()
const isMobile = computed(() => width.value < 640)

const toggleTheme = () => {
  isDark.value = !isDark.value
}

const handlePullStart = () => {
  isPulling.value = true
  // 拉下效果 - 模拟重力拉拽
  ballY.value = 168
  lineEndY.value = 166
}

const handlePullEnd = () => {
  // 回弹效果 - 模拟弹簧回弹
  setTimeout(() => {
    // 过冲一点再回弹
    ballY.value = 148
    lineEndY.value = 146
    setTimeout(() => {
      ballY.value = 152
      lineEndY.value = 150
      isPulling.value = false
    }, 100)
  }, 150)
}

const handleClick = () => {
  handlePullStart()
  toggleTheme()
  handlePullEnd()
}
</script>

<template>
  <div 
    class="fixed bottom-2 sm:bottom-4 right-2 sm:right-4 z-50 cursor-pointer transition-transform duration-300 hover:scale-105" 
    :style="{ width: isMobile ? '100px' : '150px', height: isMobile ? '140px' : '210px' }"
    @click="toggleTheme"
    title="点击切换主题"
  >
    <svg viewBox="0 0 200 280" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- 黄铜渐变 -->
        <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#C9A86C;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#D4B896;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#C9A86C;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#8B7355;stop-opacity:1" />
        </linearGradient>
        
        <!-- 深色金属 -->
        <linearGradient id="darkMetal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#3a3530;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#5a5548;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3a3530;stop-opacity:1" />
        </linearGradient>
        
        <!-- 灯光辉光 -->
        <radialGradient id="lampGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" style="stop-color:#FFD700;stop-opacity:0.6" />
          <stop offset="40%" style="stop-color:#FFA500;stop-opacity:0.3" />
          <stop offset="100%" style="stop-color:#FF8C00;stop-opacity:0" />
        </radialGradient>
        
        <!-- 灯罩内部 -->
        <radialGradient id="shadeInner" cx="50%" cy="30%" r="70%">
          <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:0.9" />
          <stop offset="50%" style="stop-color:#F5DEB3;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#DEB887;stop-opacity:0.9" />
        </radialGradient>
        
        <!-- 灯罩外部 -->
        <linearGradient id="shadeOuter" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#A0522D;stop-opacity:1" />
          <stop offset="70%" style="stop-color:#8B4513;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
        </linearGradient>
        
        <!-- 阴影滤镜 -->
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="4" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- 地面阴影 -->
      <ellipse cx="140" cy="265" rx="50" ry="10" fill="#000" opacity="0.2" filter="url(#softShadow)"/>
      
      <!-- 灯光投射 -->
      <ellipse cx="100" cy="260" rx="80" ry="20" fill="url(#lampGlow)" opacity="0.4" class="animate-pulse"/>
      
      <!-- 灯杆 - 弯曲的复古设计 -->
      <path d="M 140 260 
               Q 140 200, 130 180
               Q 120 160, 100 150
               Q 70 140, 60 120
               Q 50 100, 55 85"
            fill="none"
            stroke="url(#brassGradient)"
            stroke-width="8"
            stroke-linecap="round"
            filter="url(#softShadow)"/>
      
      <!-- 灯杆装饰节点 -->
      <circle cx="130" cy="180" r="6" fill="url(#brassGradient)"/>
      <circle cx="100" cy="150" r="5" fill="url(#brassGradient)"/>
      <circle cx="60" cy="120" r="4" fill="url(#brassGradient)"/>
      
      <!-- 底座 -->
      <ellipse cx="140" cy="260" rx="35" ry="12" fill="url(#darkMetal)" filter="url(#softShadow)"/>
      <ellipse cx="140" cy="257" rx="30" ry="10" fill="url(#brassGradient)"/>
      <ellipse cx="140" cy="254" rx="25" ry="8" fill="url(#darkMetal)"/>
      
      <!-- 灯罩 -->
      <g transform="translate(55, 85)">
        <!-- 灯罩主体 -->
        <path d="M -25 0
                 L 25 0
                 L 35 45
                 Q 0 50, -35 45
                 Z"
              fill="url(#shadeOuter)"
              filter="url(#softShadow)"/>
        
        <!-- 灯罩内发光 -->
        <ellipse cx="0" cy="45" rx="30" ry="8" fill="url(#shadeInner)" opacity="0.8"/>
        
        <!-- 灯罩顶部装饰 -->
        <ellipse cx="0" cy="0" rx="25" ry="6" fill="url(#brassGradient)"/>
        <ellipse cx="0" cy="-3" rx="20" ry="4" fill="url(#darkMetal)"/>
        
        <!-- 灯罩边缘装饰线 -->
        <path d="M -33 42 Q 0 47, 33 42" 
              fill="none" 
              stroke="url(#brassGradient)" 
              stroke-width="2"/>
        
        <!-- 灯罩纹理线条 -->
        <line x1="-15" y1="5" x2="-20" y2="40" stroke="#654321" stroke-width="0.5" opacity="0.5"/>
        <line x1="0" y1="5" x2="0" y2="42" stroke="#654321" stroke-width="0.5" opacity="0.5"/>
        <line x1="15" y1="5" x2="20" y2="40" stroke="#654321" stroke-width="0.5" opacity="0.5"/>
      </g>
      
      <!-- 灯泡发光 -->
      <circle cx="55" cy="130" r="15" fill="#FFD700" opacity="0.3" class="animate-pulse"/>
      
      <!-- 拉线开关 - 可点击 -->
      <g 
        class="cursor-pointer" 
        @mousedown.prevent="handleClick"
        @touchstart.prevent="handleClick"
      >
        <!-- 灯绳 - 使用动态长度 -->
        <line 
          x1="75" 
          y1="100" 
          :x2="75" 
          :y2="lineEndY" 
          stroke="#8B7355" 
          stroke-width="2"
          class="transition-all duration-150 ease-out"
        />
        <circle cx="75" cy="100" r="4" fill="#C9A86C"/>
        <!-- 拉绳末端的小球 - 使用动态位置 -->
        <circle 
          :cx="75" 
          :cy="ballY" 
          r="5" 
          fill="#D4B896" 
          stroke="#8B7355" 
          stroke-width="1"
          class="transition-all duration-150 ease-out"
          :class="isPulling ? 'scale-110' : ''"
        />
        <!-- 点击区域（透明） -->
        <rect x="65" y="95" width="20" height="80" fill="transparent"/>
      </g>
    </svg>
    
    <!-- 提示文字 -->
    <div class="absolute bottom-2 right-2 text-xs text-[var(--color-muted)] opacity-0 hover:opacity-100 transition-opacity duration-300 font-serif">
      点击切换主题
    </div>
  </div>
</template>

<style scoped>
/* 灯光闪烁动画 */
@keyframes flicker {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
  25% { opacity: 0.25; }
  75% { opacity: 0.45; }
}

.animate-pulse {
  animation: flicker 4s ease-in-out infinite;
}
</style>
