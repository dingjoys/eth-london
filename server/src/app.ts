import Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'Hello, Koa with TypeScript!';
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});