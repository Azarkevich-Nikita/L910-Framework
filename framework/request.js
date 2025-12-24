const url = require('url');
const querystring = require('querystring');

class Request {
    constructor(req) {
        this.originalRequest = req;
        this.method = req.method;
        this.url = req.url;
        this.headers = req.headers;
        
        // Парсинг URL и query параметров
        const parsedUrl = url.parse(req.url, true);
        this.path = parsedUrl.pathname;
        this.query = parsedUrl.query;
        
        // Инициализация тела запроса
        this.body = {};
        this.rawBody = '';
    }

    // Метод для парсинга тела запроса (для POST, PUT и т.д.)
    async parseBody() {
        return new Promise((resolve, reject) => {
            let data = '';
            
            this.originalRequest.on('data', chunk => {
                data += chunk.toString();
            });
            
            this.originalRequest.on('end', () => {
                this.rawBody = data;
                
                // Попытка распарсить JSON
                if (this.headers['content-type']?.includes('application/json')) {
                    try {
                        this.body = JSON.parse(data);
                    } catch (e) {
                        this.body = {};
                    }
                }
                // Попытка распарсить form-data
                else if (this.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
                    this.body = querystring.parse(data);
                }
                else {
                    this.body = data;
                }
                
                resolve(this.body);
            });
            
            this.originalRequest.on('error', reject);
        });
    }

    // Получение значения заголовка
    getHeader(name) {
        return this.headers[name.toLowerCase()];
    }

    // Проверка, является ли запрос определенным методом
    isMethod(method) {
        return this.method === method.toUpperCase();
    }

    // Получение query параметра
    getQuery(key) {
        return this.query[key];
    }

    // Получение параметра из body
    getBody(key) {
        if (typeof this.body === 'object' && this.body !== null) {
            return this.body[key];
        }
        return undefined;
    }
}

module.exports = Request;