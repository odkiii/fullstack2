const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'index.html');
    let contentType = 'text/html';

    // Определяем, какой файл запрашивается
    if (req.url === '/') {
        filePath = path.join(__dirname, 'index.html');
        contentType = 'text/html';
    } else if (req.url === '/styles.css') {
        filePath = path.join(__dirname, 'styles.css');
        contentType = 'text/css';
    } else if (req.url === '/styles.scss') {
        filePath = path.join(__dirname, 'styles.scss');
        contentType = 'text/x-scss';
    } else {
        // Если запрашивается несуществующий маршрут, отправляем 404
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 - Страница не найдена</h1>');
        return; // Завершаем выполнение функции
    }

    // Чтение файла
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Если произошла другая ошибка, отправляем 500
            res.writeHead(500);
            res.end('Ошибка сервера');
        } else {
            // Если файл найден, отправляем его
            res.writeHead(200, { 'Content-Type': contentType + '; charset=utf-8' });
            res.end(content);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});