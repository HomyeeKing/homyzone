// Cloudflare Worker - 图片代理，解决大陆访问问题
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 代理所有 NeoDB 图片路径 (/m/ 开头的都是图片)
    if (url.pathname.startsWith('/m/')) {
      const targetUrl = `https://neodb.social${url.pathname}${url.search}`;
      
      const response = await fetch(targetUrl, {
        headers: request.headers,
      });
      
      // 添加缓存头
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Cache-Control', 'public, max-age=86400');
      newHeaders.set('Access-Control-Allow-Origin', '*');
      
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
