const http = require("http")
const Router = require("./router")
const Request = require('./request');
const Response = require('./responce');


class App{
    constructor(){
        this.router = new Router();
        this.middlewares = [];
    }

    use(middleware){
        this.middlewares.push(middleware);
    }

    get(path, handler){
        this.router.register('GET', path, handler);
    }

    post(path, handler){
        this.router.register('POST', path, handler);
    }

    put(path, handler){
        this.router.register('PUT', path, handler);
    }

    patch(path, handler){
        this.router.register('PATCH', path, handler);
    }

    delete(path, handler){
        this.router.register('DELETE', path, handler);
    }

    listen(port, callback) {
        const server = http.createServer(async (req, res) => {
            Response(res); 
            const request = new Request(req);

            if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
                await request.parseBody();
            }

            let idx = 0;

            const next = async () => {
                if (idx < this.middlewares.length) {
                    const mw = this.middlewares[idx++];
                    await mw(request, res, next);
                }
            };

            try {
                await next();
                if (res.writableEnded) return;

                const route = this.router.match(request.method, request.path);

                if (!route) {
                    res.statusCode = 404;
                    return res.end('Not Found');
                }

                request.params = route.params;
                await route.handler(request, res);
            } catch (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
        });

        server.listen(port, callback);
    }


}

module.exports = App;