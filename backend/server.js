const http = require('http');

// Простая "база данных" в памяти
let tasks = ['Изучить Git', 'Сделать проект'];

// Создаем сервер
const server = http.createServer((req, res) => {
  // Разрешаем CORS (чтобы фронтенд мог обращаться)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  if (req.url === '/tasks' && req.method === 'GET') {
    // Возвращаем список задач
    res.end(JSON.stringify(tasks));
  } else if (req.url === '/tasks' && req.method === 'POST') {
    // Добавляем новую задачу
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const newTask = JSON.parse(body).task;
      tasks.push(newTask);
      res.end(JSON.stringify({ success: true }));
    });
  } else {
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

// Запускаем сервер
server.listen(3000, () => {
  console.log('✅ Бэкенд запущен на http://localhost:3000');
});