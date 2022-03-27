import { MysqlDB} from "../database/mysql.js";
import path from 'path';

export class Api {

    // Получение данных ползователей с Mysql и отправка данных на /api/users
    getUsers(req, res) {


        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500).end(`Error connect DB: ${err}`);

            let columns = 'id, firstName, lastName, patronicName, phone, email, dateRegis';
            let sql = `SELECT ${columns} FROM users`;
            connect.query(sql, (error, data, field) => {
                if(error) return res.sendStatus(500).end(`Error connect DB: ${error}`);

                res.send(data);
            });
        });

    };

};