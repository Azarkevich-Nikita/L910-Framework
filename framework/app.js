const http = require("http")
const Router = require("./router")


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
            let idx = 0;

            const next = async () => {
                if (idx < this.middlewares.length) {
                    const mw = this.middlewares[idx++];
                    await mw(req, res, next);
                }
            };

            try {
                await next();
                if (res.writableEnded) return;

                const { pathname } = new URL(req.url, `http://${req.headers.host}`);
                const route = this.router.match(req.method, pathname);

                if (!route) {
                    res.statusCode = 404;
                    return res.end('Not Found');
                }

                req.params = route.params;
                await route.handler(req, res);
            } catch (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            }
    });
    
    server.listen(port, callback);
    }

}

module.exports = App;


// const port = 5050

// const server = http.createServer(function(req, res){
//     try{
//         console.log('Now we connect with:', req.url)
//         res.write('Now we are working about it!')
//         res.end()
//     }
//     catch(error){
//         console.log('Something wrong', error)
//     }
// })

// server.listen(port, function(error){
//     if(error){
//         console.log('Something went wrong!', error)
//     }
//     else{
//         console.log('Server is litening on port', port)
//     }
// })