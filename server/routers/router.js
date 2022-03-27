import express from 'express';
import { Auth } from '../controllers/auth.js';
import { MainPage } from '../controllers/mainPage.js';
import { adminRouter } from './admin.js';
import { apiRouter } from './api.js';

const router = express.Router();

// Контроллеры
let mainPage = new MainPage(),
auth = new Auth();

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
router.use('/admin', adminRouter);

// API
router.use('/api', apiRouter);


export { router };