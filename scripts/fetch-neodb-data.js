#!/usr/bin/env node
/**
 * 构建时从 NeoDB 获取数据并生成静态 JSON 文件
 * 用法: node scripts/fetch-neodb-data.js
 */

const fs = require('fs');
const path = require('path');

const TOKEN = process.env.VITE_NEODB_TOKEN || process.env.NEODB_TOKEN;

if (!TOKEN) {
  console.error('Error: VITE_NEODB_TOKEN or NEODB_TOKEN environment variable is required');
  process.exit(1);
}

const CATEGORIES = [
  { key: 'movies', category: 'movie', shelf: 'complete' },
  { key: 'movies_wishlist', category: 'movie', shelf: 'wishlist' },
  { key: 'dramas', category: 'tv', shelf: 'complete' },
  { key: 'dramas_wishlist', category: 'tv', shelf: 'wishlist' },
  { key: 'books', category: 'book', shelf: 'complete' },
  { key: 'books_wishlist', category: 'book', shelf: 'wishlist' },
];

async function fetchData(category, shelf) {
  const url = `https://neodb.social/api/me/shelf/${shelf}?category=${category}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    const results = data.data || data.results || data || [];
    
    // 处理数据，提取豆瓣链接
    return results.map(item => {
      const externalUrls = item.item?.external_resources || [];
      const doubanUrl = externalUrls.find(url => 
        url.url?.includes('douban.com') || 
        url.url?.includes('movie.douban.com') ||
        url.url?.includes('book.douban.com')
      )?.url;
      
      return {
        ...item,
        douban_url: doubanUrl || null
      };
    });
  } catch (error) {
    console.error(`Failed to fetch ${category}/${shelf}:`, error.message);
    return [];
  }
}

async function main() {
  const outputDir = path.join(__dirname, '..', 'public', 'data');
  
  // 创建输出目录
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  console.log('Fetching NeoDB data...\n');
  
  for (const { key, category, shelf } of CATEGORIES) {
    console.log(`Fetching ${key}...`);
    const data = await fetchData(category, shelf);
    
    const outputFile = path.join(outputDir, `${key}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
    
    console.log(`  ✓ ${data.length} items saved to data/${key}.json`);
  }
  
  // 生成合并的数据文件
  console.log('\nGenerating combined data files...');
  
  const movies = [
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'movies.json'), 'utf8')),
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'movies_wishlist.json'), 'utf8'))
  ];
  fs.writeFileSync(path.join(outputDir, 'movies_all.json'), JSON.stringify(movies, null, 2));
  console.log(`  ✓ movies_all.json: ${movies.length} items`);
  
  const dramas = [
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'dramas.json'), 'utf8')),
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'dramas_wishlist.json'), 'utf8'))
  ];
  fs.writeFileSync(path.join(outputDir, 'dramas_all.json'), JSON.stringify(dramas, null, 2));
  console.log(`  ✓ dramas_all.json: ${dramas.length} items`);
  
  const books = [
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'books.json'), 'utf8')),
    ...JSON.parse(fs.readFileSync(path.join(outputDir, 'books_wishlist.json'), 'utf8'))
  ];
  fs.writeFileSync(path.join(outputDir, 'books_all.json'), JSON.stringify(books, null, 2));
  console.log(`  ✓ books_all.json: ${books.length} items`);
  
  console.log('\n✅ All data fetched and saved!');
}

main().catch(console.error);
