const http = require('http');

let tasks = ['Изучить Git', 'Сделать проект', 'Настроить совместную работу'];

const server = http.createServer((req, res) => {
  // Разрешаем CORS для всех доменов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Обрабатываем preflight запрос (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/tasks' && req.method === 'GET') {
    res.end(JSON.stringify(tasks));
  } else if (req.url === '/tasks' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const newTask = JSON.parse(body).task;
        tasks.push(newTask);
        res.end(JSON.stringify({ success: true, tasks }));
      } catch (error) {
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(3000, '0.0.0.0', () => {
  console.log('✅ Бэкенд запущен на http://localhost:3000');
});