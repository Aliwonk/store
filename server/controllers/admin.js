import path from 'path';
import { MysqlDB } from '../database/mysql.js';

export class Admin {

    // Загрузка Html страницы админа
    get(req, res) {

        res.sendFile(path.resolve('client', 'dist/pages/admin.html'));

    };

};