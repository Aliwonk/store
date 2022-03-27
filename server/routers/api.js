import express from 'express';
import { Api } from '../controllers/api.js';

const apiRouter = express.Router();

const controller = new Api();

// api с данными пользователей
apiRouter.route('/users')
.get(controller.getUsers);

export { apiRouter };