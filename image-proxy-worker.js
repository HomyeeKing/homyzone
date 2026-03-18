// Cloudflare Worker - 图片代理，解决大陆访问问题
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 代理所有 NeoDB 图片路径 (/m/ 开头的都是图片)
    if (url.pathname.startsWith('/m/')) {
      const targetUrl = `https://neodb.social${url.pathname}${url.search}`;
      
      // 创建缓存键
      const cacheKey = new Request(targetUrl, request);
      const cache = caches.default;
      
      // 尝试从缓存获取
      let response = await cache.match(cacheKey);
      
      if (!response) {
        // 缓存未命中，从源站获取
        response = await fetch(targetUrl, {
          headers: request.headers,
        });
        
        // 克隆响应（因为 response 只能读取一次）
        const responseClone = response.clone();
        
        // 添加缓存头
        const newHeaders = new Headers(response.headers);
        newHeaders.set('Cache-Control', 'public, max-age=604800, s-maxage=604800'); // 7天
        newHeaders.set('Access-Control-Allow-Origin', '*');
        newHeaders.set('Vary', 'Accept-Encoding');
        
        // 创建新的响应
        const cachedResponse = new Response(responseClone.body, {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders,
        });
        
        // 存入 Cloudflare Edge 缓存
        ctx.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
        
        return cachedResponse;
      }
      
      // 缓存命中，添加 CORS 头后返回
      const newHeaders = new Headers(response.headers);
      newHeaders.set('Access-Control-Allow-Origin', '*');
      newHeaders.set('CF-Cache-Status', 'HIT');
      
      return new Response(response.body, {
        status: response.status,
        headers: newHeaders,
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
