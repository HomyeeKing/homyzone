import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Route{
  name: string
  meta: any
  path: string
  props: boolean
  component: any
  tags?: string[]
}
