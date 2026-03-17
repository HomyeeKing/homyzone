// Cloudflare Worker - 将 /me 路径代理到 Netlify

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 如果路径是 /me 或 /me/*，代理到 Netlify
    if (url.pathname === '/me' || url.pathname.startsWith('/me/')) {
      // 移除 /me 前缀，构造目标 URL
      const targetPath = url.pathname.replace(/^\/me/, '') || '/';
      const targetUrl = `https://homyzone.netlify.app${targetPath}${url.search}`;
      
      // 创建新的请求
      const modifiedRequest = new Request(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body
      });
      
      // 获取响应
      const response = await fetch(modifiedRequest);
      
      // 创建新的响应，修改 Location header（如果有重定向）
      const newHeaders = new Headers(response.headers);
      const location = newHeaders.get('location');
      if (location && location.includes('homyzone.netlify.app')) {
        newHeaders.set('location', location.replace('https://homyzone.netlify.app', 'https://homyeeking.top/me'));
      }
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
      });
    }
    
    // 其他路径正常处理
    return fetch(request);
  }
};
