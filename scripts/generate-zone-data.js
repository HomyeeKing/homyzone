import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import matter from 'gray-matter'

const zoneDir = resolve(process.cwd(), 'src/pages/zone')
const files = readdirSync(zoneDir).filter(f => f.endsWith('.md'))

const posts = files.map(file => {
  const content = readFileSync(resolve(zoneDir, file), 'utf-8')
  const { data, content: body } = matter(content)
  
  // 从文件名提取日期
  const dateMatch = file.match(/(\d{4}-\d{2}-\d{2})/)
  const date = dateMatch ? dateMatch[1] : data.date
  
  // 提取标题（第一行或 frontmatter）
  const lines = body.split('\n').filter(line => line.trim())
  const title = data.title || (lines[0]?.slice(0, 30) + (lines[0]?.length > 30 ? '...' : '')) || '无标题'
  
  return {
    title,
    content: body.trim(),
    date,
    visible: data.visible !== false,
  }
}).filter(p => p.visible)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

writeFileSync(
  resolve(zoneDir, 'posts.json'),
  JSON.stringify(posts, null, 2)
)

console.log(`Generated zone data: ${posts.length} posts`)
