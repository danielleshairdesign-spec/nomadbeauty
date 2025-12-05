export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Handle root path
    if (url.pathname === '/') {
      url.pathname = '/index.html';
    }
    
    // Try to get the asset
    try {
      return await env.ASSETS.fetch(url.toString());
    } catch (e) {
      // If asset not found, return 404
      return new Response('Not Found', { status: 404 });
    }
  },
};