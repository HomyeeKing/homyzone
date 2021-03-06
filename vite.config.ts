import path from 'path'
import fs from 'fs'
import { UserConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layout from 'vite-plugin-vue-layouts'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import ViteComponents from 'vite-plugin-components'
import Markdown from 'vite-plugin-md'
import matter from 'gray-matter'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Prism from 'markdown-it-prism'
import anchor from 'markdown-it-anchor'

const config: UserConfig = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    open: true,
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      extensions: ['vue', 'md'],
      extendRoute(route) {
        const routePath = path.resolve(__dirname, route.component.slice(1))
        if (routePath.endsWith('.md')) {
          const md = fs.readFileSync(routePath, 'utf-8')
          const { data } = matter(md)
          route.meta = Object.assign(route.meta || {}, { frontmatter: data })
          return route
        }
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layout(),

    // https://github.com/antfu/vite-plugin-md
    Markdown({
      wrapperComponent: 'blog',
      wrapperClasses: 'prose prose-sm m-auto',
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(anchor, {
          permalink: true,
          permalinkBefore: true,
          permalinkSymbol: '#',
          permalinkAttrs: () => ({ 'aria-hidden': true }),
        })
      },
    }),

    // https://github.com/antfu/vite-plugin-components
    ViteComponents({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],

      // allow auto import and register components used in markdown
      customLoaderMatcher: id => id.endsWith('.md'),

      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: '',
          // enabledCollections: ['carbon']
        }),
      ],
    }),

    // https://github.com/antfu/vite-plugin-icons
    ViteIcons(),

    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),

    // https://github.com/intlify/vite-plugin-vue-i18n
    VueI18n({
      include: [path.resolve(__dirname, 'locales/**')],
    }),
  ],
}

export default config
