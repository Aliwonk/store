import path from 'path';
import { MysqlDB } from '../database/mysql.js';

export class Admin {

    // Загрузка Html страницы админа
    get(req, res) {

        res.sendFile(path.resolve('client', 'dist/pages/admin.html'));

    };


    // Страница отдельного пользователя

    getUser(req, res) {
        
        // Получаем id пользователя
        const id = req.params.id;

        //  Получаем данные пользователя по id из Mysql
        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500);


            let sql = `SELECT id, firstName, lastName, patronicName, phone, email, dateRegis FROM users WHERE id=${id}`;
            connect.query(sql, (error, data) => {
                if(error) return res.send(error);

                res.send(data);
            });
        });

    };

};