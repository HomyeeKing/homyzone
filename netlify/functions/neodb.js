exports.handler = async (event, context) => {
  // 从环境变量读取 Token
  const token = process.env.NEODB_TOKEN || process.env.VITE_NEODB_TOKEN;
  
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'NEODB_TOKEN not configured' })
    };
  }

  // 解析请求路径
  const path = event.path.replace('/.netlify/functions/neodb', '');
  const url = `https://neodb.social/api${path}`;
  
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
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
