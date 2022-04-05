import express from 'express';
import { Api } from '../controllers/api.js';

const apiRouter = express.Router();

const controller = new Api();

// api с данными пользователей
apiRouter.route('/users')
.get(controller.getUsers);

// api с данными торавов
apiRouter.route('/goods')
.get(controller.getGoods);

// api картинок товаров
apiRouter.route('/goodsImg')
.get(controller.getGoodsImg);

export { apiRouter };