import { resolve } from 'node:path'
import type { UserConfig } from 'vite'
import { readFileSync } from 'fs-extra'
import Pages from 'vite-plugin-pages'
import Inspect from 'vite-plugin-inspect'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'vite-plugin-vue-markdown'
import Vue from '@vitejs/plugin-vue'
import Prism from 'markdown-it-prism'
import matter from 'gray-matter'
import AutoImport from 'unplugin-auto-import/vite'
import anchor from 'markdown-it-anchor'
import LinkAttributes from 'markdown-it-link-attributes'
import UnoCSS from 'unocss/vite'
import SVG from 'vite-svg-loader'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import { slugify } from './scripts/slugify'

// 代码高亮
import 'prismjs/components/prism-regex'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-xml-doc'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-javadoclike'
import 'prismjs/components/prism-javadoc'
import 'prismjs/components/prism-jsdoc'
import type { Route } from '@/types'

const config: UserConfig = {
  resolve: {
    alias: [{ find: '@/', replacement: `${resolve(__dirname, 'src')}/` }],
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'dayjs',
      'dayjs/plugin/localizedFormat',
    ],
  },
  plugins: [
    UnoCSS({
      theme: {
        fontFamily: {
          sans: '"Inter", Inter var,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
        },
      },
      presets: [
        presetIcons({
          extraProperties: {
            'display': 'inline-block',
            'height': '1.2em',
            'width': '1.2em',
            'vertical-align': 'text-bottom',
          },
        }),
        presetAttributify(),
        presetUno(),
      ],
    }),

    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route: Route) {
        const path = resolve(__dirname, route.component.slice(1))

        const md = readFileSync(path, 'utf-8')
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })

        if (route.path.startsWith('/blogs/')) {
          const tmp = route.path.split('/')
          const tag = tmp[2] as string
          // recognize group
          if (route.path === `/blogs/${tag}`) {
            route.meta.frontmatter.isCategory = true
          }
          else {
            // generate tags
            (route.meta.frontmatter.tags ??= []).push(tag)
          }
        }
        return route
      },
    }),

    Markdown({
      wrapperComponent: 'blog',
      wrapperClasses: 'prose',
      headEnabled: true,
      markdownItOptions: {
        quotes: '""\'\'',
      },
      markdownItSetup(md) {
        md.use(Prism)
        // 添加代码块复制按钮
        const defaultFence = md.renderer.rules.fence!
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const code = defaultFence(tokens, idx, options, env, self)
          // 包裹一层div，便于前端挂载复制按钮
          return `<div class="code-block-with-copy">${code}</div>`
        }
        md.use(anchor, {
          slugify,
          permalink: anchor.permalink.linkInsideHeader({
            symbol: '#',
            renderAttrs: () => ({ 'aria-hidden': 'true' }),
          }),
        })

        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })

        md.use(TOC, {
          includeLevel: [1, 2, 3],
          slugify,
        })
      },
    }),

    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    Inspect(),

    Icons({
      defaultClass: 'inline',
      defaultStyle: 'vertical-align: sub;',
    }),

    SVG({
      svgo: false,
    }),
  ],

  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT')
          next(warning)
      },
    },
  },

  ssgOptions: {
    formatting: 'minify',
    format: 'cjs',
  },
}

export default config
