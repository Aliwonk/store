import { MysqlDB} from "../database/mysql.js";
import path from 'path';

export class Api {

    // Получение данных ползователей с Mysql и отправка данных на /api/users
    getUsers(req, res) {


        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500).end(`Error connect DB: ${err}`);

            let columns = 'id, first_name, last_name, patronic_name, phone, email, date_regis';
            let sql = `SELECT ${columns} FROM users`;
            connect.query(sql, (error, data, field) => {
                if(error) return res.sendStatus(500).end(`Error connect DB: ${error}`);

                res.send(data);
            });
        });

    };


    getGoods(req, res) {

        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500).end(`Error connect DB: ${err}`);

            let sqlGoods = 'SELECT * FROM goods';
            let sqlImg = 'SELECT * FROM goods_img';
            let data;
            // Получение всех данных о товарах
            connect.query(sqlGoods, (error, goods) => {
                if(error) return res.send(error);
                
                // Отправка данных товаров
                res.send(goods);
            });
        });
        

    };

    getGoodsImg(req, res) {

        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500).end(`Error connect DB: ${err}`);

            let sqlImg = 'SELECT * FROM goods_img';
           // получение картинок товаров
            connect.query(sqlImg, (errGetImg, img) => {
                if(errGetImg) return res.send(errGetImg);

                // Отправка данных товаров
                res.send(img);
            });
        });

    }
};