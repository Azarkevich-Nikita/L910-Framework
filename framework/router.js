class Router {
    constructor() {
        this.routes = [];
    }

    register(method, path, handler) {
        const parts = path.split('/').filter(Boolean);

        this.routes.push({
            method,
            parts,
            handler
        });
    }

    match(method, pathname) {
        const urlParts = pathname.split('/').filter(Boolean);

        for (const route of this.routes) {
            if (route.method !== method) continue;
            if (route.parts.length !== urlParts.length) continue;

            const params = {};

            const isMatch = route.parts.every((routePart, i) => {
                const urlPart = urlParts[i];

                if (routePart.startsWith(':')) {
                    params[routePart.slice(1)] = urlPart;
                    return true;
                }

                return routePart === urlPart;
            });

            if (isMatch) {
                return { handler: route.handler, params };
            }
        }

        return null;
    }
}

module.exports = Router;