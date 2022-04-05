import express from 'express';
import { router } from './routers/router.js';
import path from 'path';

const app = express();

// route
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.static(path.resolve('client', 'upload')));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use('/', router);

export { app };