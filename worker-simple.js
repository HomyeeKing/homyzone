// 将 /me 路径代理到 Netlify
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === '/me' || url.pathname.startsWith('/me/')) {
      const targetPath = url.pathname.replace(/^\/me/, '') || '/';
      const targetUrl = `https://homyzone.netlify.app${targetPath}${url.search}`;
      
      return fetch(new Request(targetUrl, request));
    }
    
    return fetch(request);
  }
};
