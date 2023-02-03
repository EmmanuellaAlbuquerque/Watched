
// HTTP operations

// GET
export async function get(url, resource) {
  const init = { 
    method: 'GET' 
  };

  let response = await fetch(url, init);
  let json = await response.json();

  let payload = json[resource];
  return payload;
}

// POST
export async function post(url, resource, body) {
  const init = { 
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  };

  let response = await fetch(url, init);
  let json = await response.json();

  let payload = json[resource];
  return payload;
}
