import express from 'express';
import { Admin } from '../controllers/admin.js';
import path from 'path';
import { MysqlDB } from '../database/mysql.js';
import { checkAdminAuth } from '../middlewares/admin.js';

const adminRouter = express.Router(),
controller = new Admin();

// Загрузка статических папок в админ
adminRouter.use(express.static(path.resolve('client', 'dist')))

// Проверка токена
// adminRouter.use(checkAdminAuth);

// Главная страница админа
adminRouter.route('')
.get(controller.get);


    // Страница отдельного пользователя
adminRouter.route('/user/:id')
.get(controller.getUser);

export { adminRouter };