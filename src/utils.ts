import { join, resolve } from 'path'
import { lstatSync, readdirSync } from 'fs-extra'

/** blogs下一级目录作为类别 */
const blogPath = resolve(__dirname, './pages/blogs')
export const blogTags = readdirSync(blogPath).filter(tag => lstatSync(join(blogPath, tag)).isDirectory())
