import express from 'express';
import { Admin } from '../controllers/admin.js';
import path from 'path';
import { MysqlDB } from '../database/mysql.js';
import { checkAdminAuth } from '../middlewares/admin.js';
import multer from 'multer';

const adminRouter = express.Router(),
controller = new Admin();

// Загрузка статических папок в админ
adminRouter.use(express.static(path.resolve('client', 'dist')));
adminRouter.use(express.static(path.resolve('client', 'upload')));

// Проверка токена
// adminRouter.use(checkAdminAuth);

let uploads = multer({dest: path.resolve('client', 'upload')});

// Главная страница админа
adminRouter.route('')
.get(controller.get)
.post(uploads.single('good_img'), controller.uploadGood)
.put(uploads.single('good_img'), controller.updateGood)
.delete(controller.delGood);


    // Страница отдельного пользователя
adminRouter.route('/user/:id')
.get(controller.getUser);

export { adminRouter };