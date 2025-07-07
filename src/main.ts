import '@unocss/reset/tailwind.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import 'uno.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import App from './App.vue'

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  if (savedPosition)
    return savedPosition
  else
    return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior },
  ({ router, isClient }) => {
    dayjs.extend(LocalizedFormat)

    if (isClient) {
      router.beforeEach(() => { NProgress.start() })
      router.afterEach(() => { NProgress.done() })

      // 挂载代码块复制按钮
      setTimeout(() => {
        document.querySelectorAll('.code-block-with-copy').forEach((block) => {
          if (block.querySelector('.copy-btn')) return // 防止重复添加
          const btn = document.createElement('button')
          btn.textContent = '复制'
          btn.className = 'copy-btn'
          btn.style.position = 'absolute'
          btn.style.top = '8px'
          btn.style.right = '8px'
          btn.style.zIndex = '10'
          btn.style.fontSize = '12px'
          btn.style.background = '#eee'
          btn.style.border = 'none'
          btn.style.borderRadius = '4px'
          btn.style.padding = '2px 8px'
          btn.style.cursor = 'pointer'
          btn.onclick = (e) => {
            e.stopPropagation()
            const code = block.querySelector('code')?.innerText
            if (code) {
              navigator.clipboard.writeText(code)
              btn.textContent = '已复制!'
              setTimeout(() => (btn.textContent = '复制'), 1000)
            }
          }
          (block as HTMLElement).style.position = 'relative'
          block.appendChild(btn)
        })
      }, 100)
    }
  },
)
