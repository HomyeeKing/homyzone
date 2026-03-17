exports.handler = async (event, context) => {
  // 处理 CORS 预检请求
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
      },
      body: ''
    };
  }

  // 从环境变量读取 Token（优先使用 VITE_NEODB_TOKEN）
  const token = process.env.VITE_NEODB_TOKEN || process.env.NEODB_TOKEN;
  
  if (!token) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'NEODB_TOKEN not configured' })
    };
  }

  // 解析请求路径和 query 参数
  const path = event.path.replace('/.netlify/functions/neodb', '');
  const queryString = event.queryStringParameters ? 
    '?' + Object.entries(event.queryStringParameters)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join('&') : '';
  
  const url = `https://neodb.social/api${path}${queryString}`;
  
  console.log('Fetching:', url); // 用于调试
  
  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`NeoDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: error.message })
    };
  }
};
