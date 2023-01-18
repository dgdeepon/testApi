
const server=require('json-server');
const jsonServer=server.create();
const route=server.router('db.json');
const middle=server.defaults();
const port= process.env.PORT() || 3000;


jsonServer.use(middle);
jsonServer.use(route);
jsonServer.listen(port);