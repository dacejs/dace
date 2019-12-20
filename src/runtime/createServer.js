import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import addStatic from './utils/addStatic';
import urlRewrite from './utils/urlRewrite';
import ssrMiddleware from './ssrMiddleware';

const server = express();

server.disable('x-powered-by');

// 挂载虚拟目录
addStatic(server);

// 解析 cookie
server.use(cookieParser());

// 解析json
server.use(bodyParser.json());

// 挂载 mock 数据路由
urlRewrite(server);

server.all('*', ssrMiddleware);


export default server;
