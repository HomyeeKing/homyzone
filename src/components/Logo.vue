<template>
  <!-- 手写衬线体 SVG Logo -->
  <svg
    class="h-10 sm:h-12 w-auto overflow-visible"
    viewBox="0 0 420 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:var(--color-accent);stop-opacity:1" />
        <stop offset="50%" style="stop-color:var(--color-primary);stop-opacity:1" />
        <stop offset="100%" style="stop-color:var(--color-secondary);stop-opacity:1" />
      </linearGradient>
      <filter id="logo-glow">
        <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- homyeeking - 手写衬线体连笔 SVG path -->
    <g filter="url(#logo-glow)" fill="none" stroke="url(#logo-gradient)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <!-- h - 手写连笔 -->
      <path d="M25 55 L25 35 C25 28, 28 22, 35 22 C42 22, 45 28, 45 35 L45 55 M25 40 L45 40" 
            class="letter-h"/>
      
      <!-- o - 手写椭圆 -->
      <path d="M55 38 C55 28, 62 22, 72 22 C82 22, 88 28, 88 38 C88 48, 82 55, 72 55 C62 55, 55 48, 55 38" 
            class="letter-o"/>
      
      <!-- m - 手写连笔 -->
      <path d="M98 55 L98 25 C98 20, 102 18, 108 22 L118 35 L128 22 C134 18, 138 20, 138 25 L138 55" 
            class="letter-m"/>
      
      <!-- y - 手写连笔带下延 -->
      <path d="M148 25 L158 40 L168 25 M158 40 L158 55 C158 62, 152 68, 142 65" 
            class="letter-y"/>
      
      <!-- e - 手写连笔 -->
      <path d="M178 38 C178 28, 185 22, 198 22 C208 22, 215 28, 215 38 L178 38 C178 48, 185 55, 198 55 C205 55, 210 52, 212 48" 
            class="letter-e"/>
      
      <!-- e2 - 第二个e -->
      <path d="M225 38 C225 28, 232 22, 245 22 C255 22, 262 28, 262 38 L225 38 C225 48, 232 55, 245 55 C252 55, 257 52, 259 48" 
            class="letter-e2"/>
      
      <!-- k - 手写连笔 -->
      <path d="M272 15 L272 55 M272 35 L292 22 M272 35 L292 48" 
            class="letter-k"/>
      
      <!-- i - 手写带圆点 -->
      <path d="M302 25 L302 55" class="letter-i"/>
      <circle cx="302" cy="18" r="2.5" fill="url(#logo-gradient)" class="letter-i-dot"/>
      
      <!-- n - 手写连笔 -->
      <path d="M312 55 L312 25 C312 20, 316 18, 322 22 L332 35 L342 22 C348 18, 352 20, 352 25 L352 55" 
            class="letter-n"/>
      
      <!-- g - 手写带下延 -->
      <path d="M362 25 L362 55 C362 65, 355 72, 342 68 M362 38 C362 28, 368 22, 382 22 C392 22, 398 28, 398 38 C398 48, 392 55, 382 55 C375 55, 370 52, 368 48" 
            class="letter-g"/>
    </g>

    <!-- 装饰下划线 -->
    <path d="M15 68 Q 200 72, 410 68" 
          stroke="url(#logo-gradient)" 
          stroke-width="2.5" 
          stroke-linecap="round"
          class="underline-draw"
          fill="none"
          opacity="0.7"/>
  </svg>
</template>

<style scoped>
/* 手写动画效果 */
.letter-h, .letter-o, .letter-m, .letter-y, .letter-e, .letter-e2, .letter-k, .letter-i, .letter-n, .letter-g {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  animation: drawLetter 0.6s ease-out forwards;
}

.letter-h { animation-delay: 0.1s; }
.letter-o { animation-delay: 0.2s; }
.letter-m { animation-delay: 0.3s; }
.letter-y { animation-delay: 0.4s; }
.letter-e { animation-delay: 0.5s; }
.letter-e2 { animation-delay: 0.6s; }
.letter-k { animation-delay: 0.7s; }
.letter-i { animation-delay: 0.8s; }
.letter-i-dot { animation: dotAppear 0.3s ease-out 1s forwards; opacity: 0; }
.letter-n { animation-delay: 0.9s; }
.letter-g { animation-delay: 1s; }

.underline-draw {
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: drawUnderline 1.2s ease-out 1.2s forwards;
}

@keyframes drawLetter {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes drawUnderline {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dotAppear {
  to {
    opacity: 1;
  }
}
</style>
