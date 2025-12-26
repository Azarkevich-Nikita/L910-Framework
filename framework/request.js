const { URL } = require('url');

class Request {
    constructor(req) {
        this._req = req;
        this.method = req.method;
        this.url = req.url;
        this.path = '';
        this.params = {};
        this.query = {};
        this.body = null;
        this.parseQuery();
    }

    parseQuery() {
        const parsedUrl = new URL(
            this.url,
            `http://${this._req.headers.host}`
        );

        this.path = parsedUrl.pathname;
        this.query = Object.fromEntries(
            parsedUrl.searchParams.entries()
        );
    }

    parseBody() {
        return new Promise((resolve, reject) => {
            let data = '';

            this._req.on('data', chunk => {
                data += chunk;
            });

            this._req.on('end', () => {
                if (!data) {
                    this.body = null;
                    return resolve();
                }

                try {
                    this.body = JSON.parse(data);
                    resolve();
                } catch (err) {
                    reject(new Error('Invalid JSON'));
                }
            });
        });
    }
}

module.exports = Request;
