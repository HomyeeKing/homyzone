import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import matter from 'gray-matter'

const zoneDir = resolve(process.cwd(), 'src/pages/zone')
const files = readdirSync(zoneDir).filter(f => f.endsWith('.md'))

// 处理内容：移除 markdown 标记，截取前 280 字
const formatContent = (content) => {
  let text = content
    .replace(/#+ /g, '') // 标题
    .replace(/\*\*/g, '') // 粗体
    .replace(/\*/g, '') // 斜体
    .replace(/`{3}[\s\S]*?`{3}/g, '[代码]') // 代码块
    .replace(/`([^`]+)`/g, '$1') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/> /g, '') // 引用
    .replace(/\n+/g, ' ') // 换行转空格
    .trim()
  
  // 截取 280 字
  if (text.length > 280) {
    text = text.slice(0, 280).trim() + '...'
  }
  
  return text
}

// 格式化日期为 Twitter 风格（基于构建时间）
const formatTime = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 365) {
    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' })
  } else if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else {
    return '刚刚'
  }
}

// 格式化完整日期
const formatFullDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

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
    content: formatContent(body.trim()),
    date,
    timeAgo: formatTime(date),
    fullDate: formatFullDate(date),
    visible: data.visible !== false,
  }
}).filter(p => p.visible)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

writeFileSync(
  resolve(zoneDir, 'posts.json'),
  JSON.stringify(posts, null, 2)
)

console.log(`Generated zone data: ${posts.length} posts`)
