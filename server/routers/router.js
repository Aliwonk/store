import express from 'express';
import { Admin } from '../controllers/admin.js';
import { Auth } from '../controllers/auth.js';
import {MainPage } from '../controllers/mainPage.js';

const router = express.Router();

// Контроллеры
let mainPage = new MainPage(),
auth = new Auth(),
admin = new Admin();

// Маршруты

    // главная страница
router.route('')
.get(mainPage.get)
.post();

    // Страница регистрации
router.route('/signUp')
.get(auth.getSignUp)
.post(auth.postSignUp);
    
    // Страница входа
router.route('/signIn')
.get(auth.getSignIn)
.post(auth.postSignIn);

    // страница админа
router.route('/admin')
.get(admin.get);


export { router };