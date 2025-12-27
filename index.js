const App = require("./framework/app");
const armyRouter = require("./services/army/army.routes");
const pullRouter = require("./services/pull/pull.router");
const theatreRouter = require("./services/theatre/theatre.routes");

const app = new App();

app.use(async (req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    await next();
});

armyRouter(app);
pullRouter(app);
theatreRouter(app);

app.get('/', async(req,res) => {
    res.statusCode = 200;
    res.end('Hello World');
});

app.get('/users/:id', async(req,res) => {
    res.statusCode = 200;
    res.end(`User id = ${req.params.id}`);
});

app.post('/users/:id', async(req,res) => {
    res.statusCode = 201;
    res.end('User created');
});

app.listen(5050, () => {
    console.log('Server started on http://localhost:5050');
});