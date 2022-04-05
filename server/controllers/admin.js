import path from 'path';
import { MysqlDB } from '../database/mysql.js';
import fs from 'fs';


// Заголовок для ответа fetch
let headers = {
        'Content-Type' : 'application'
};
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


            let sql = `SELECT id, first_name, last_name, patronic_name, phone, email, date_regis FROM users WHERE id=${id}`;
            connect.query(sql, (error, data) => {
                if(error) return res.send(error);

                res.send(data);
            });
        });

    };

    // Загрузка товара
    uploadGood(req, res) {
        if(!req.body || !req.file) return res.sendStatus(400);

        // Переименование файла
        var newName = req.file.path + path.parse(req.file.originalname).ext;
        fs.rename(req.file.path, newName, (errRename) => {
            if(errRename) return res.writeHead(500, headers).end(JSON.stringify({save:false, err: errRename}));

            // Подключение к myslq
            MysqlDB((err, connect) => {
                if(err) return res.sendStatus(500).end(err);
                
    
                // Данные товара
                let goods = {
                    name: '"' + req.body.good_name + '"',
                    desc: '"' + req.body.good_desc + '"',
                    price: Number(req.body.good_price),
                    amount: Number(req.body.good_amount)
                };
    
                // Сохранение товара
                let values = `${goods.name}, ${goods.desc}, ${goods.price}, ${goods.amount}`;
                let sql = `INSERT INTO goods(good_name, good_desc, good_price, good_amount) VALUES (${values})`;
                connect.query(sql, (error, result) => {
                    if(error) return res.writeHead(500, headers).end(JSON.stringify({save: false, err: error}));
    
                    // Сохранение рисунка товара
                    let sql = `INSERT INTO goods_img(good_id, filename) VALUES(${result.insertId}, ${'"' + req.file.filename + path.parse(req.file.originalname).ext + '"'})`;
                    
                    connect.query(sql, (errImg, resultImg) => {
                        if(errImg) return res.writeHead(500, headers).end(JSON.stringify({save: false, err: errImg}));
    
                        res.writeHead(200, headers).end(JSON.stringify({save: true}));
                        
                    });;
    
                });
            
            });

        })

    };


    // Удаление товара
    delGood(req, res) { 
        if(!req.body) res.sendStatus(400);
        let del_good = req.body.good_del;

        if(del_good) {
            if(del_good.id === '' && del_good.id_img === '' ) return  res.writeHead(404, headers).end(JSON.stringify({delete: false, error: 'good_del not found'}));

            MysqlDB((err, connect) => {
                if(err) res.sendStatus(500).end(err);

                let sqlGood = `DELETE FROM goods WHERE id=${del_good.id}`;
                let sqlImg = `DELETE FROM goods_img WHERE good_id=${del_good.id_img}`;
                let sqlFilename = `SELECT filename FROM goods_img WHERE good_id=${del_good.id_img}`; 
                
                // Получение название файла рисунка
                connect.query(sqlFilename, (errGetFilename, filename) => {
                    if(errGetFilename) return res.writeHead(500, headers).end(JSON.stringify({delete: false, err: errDelFileImg}));

                    // Удаление файла рисунка из папки upload
                    fs.unlink(path.resolve('client', 'upload')+ '\\' + filename[0].filename, (errDelFileImg, resultDelFileImg) => {
                        if(errDelFileImg) res.writeHead(500, headers).end(JSON.stringify({delete: false, err: errDelFileImg}));

                        // Удаление название файла рисунка в Mysql
                        connect.query(sqlImg, (errDelImg, result) => {
                            if(errDelImg) return res.writeHead(500, headers).end(JSON.stringify({delete: false, err: errDelImg}));

                            // Удаление товара
                            connect.query(sqlGood, (errDelGood, result) => {
                                if(errDelGood) return  res.writeHead(500, headers).end(JSON.stringify({result: false, err: errDelGood}));

                                res.writeHead(200, headers).end(JSON.stringify({delete: true}));
                            });
                        });

                    });
                });
            });
        }else{

            res.writeHead(404, headers).end(JSON.stringify({delete: false, error: 'good_del not found'}));
            
        };
    };

    // Обновление товара
    updateGood(req, res) {
        if(!req.body && !req.file) return res.sendStatus(400);


        // Данные товара
        let goods = {
            id: Number(req.body.good_id),
            name: '"' + req.body.good_name + '"',
            desc: '"' + req.body.good_desc + '"',
            price: Number(req.body.good_price),
            amount: Number(req.body.good_amount)
        };
    
        MysqlDB((err, connect) => {
            if(err) return res.sendStatus(500).end(err);

            // Если имееться новый рисунок
            if(req.file) {
                //Новый файл рисунка товара
                let newImg = req.file.path + path.parse(req.file.originalname).ext;
                

                // Получение название старого файла рисунка товара, чтобы удалить этот файл из папки upload
                let sqlOldImg = `SELECT filename FROM goods_img WHERE good_id=${goods.id}`;
                connect.query(sqlOldImg, (errGetFilename, file) => {
                    if(errGetFilename) return res.writeHead(500, headers).end(JSON.stringify({upgrade: false, err: errGetFilename}));
                
                    // Удаление старого рисунка из client/upload
                    fs.unlink(path.resolve('client', 'upload') + '\\' + file[0].filename, (errDelFileImg, resultDelFileImg) => {
                        if(errDelFileImg) return res.writeHead(500, headers).end(JSON.stringify({update: false, err: errDelFileImg}));

                        // Сохранение название нового файла рисунка в Mysql
                        let sqlNewImg = `UPDATE goods_img SET filename=${'"' + req.file.filename + path.parse(req.file.originalname).ext + '"'} WHERE good_id=${goods.id}`;
                        connect.query(sqlNewImg, (errSaveImg, resultSaveImg) => {
                            if(errSaveImg) return res.writeHead(500, headers).end(JSON.stringify({update: false, err: errSaveImg}));
                            
                            // Сохранение рисунка в папке client/upload
                            fs.rename(path.resolve('client', `upload\\${req.file.filename}`), newImg, (errRenameImg) => {
                                if(errRenameImg) return res.writeHead(500, headers).end(JSON.stringify({update: false, err: errRenameImg}));

                                // Сохранение данных товара
                                let sqlGood = `UPDATE goods SET good_name=${goods.name}, good_desc=${goods.desc}, good_price=${goods.price}, good_amount=${goods.amount} WHERE id=${goods.id}`;
                                connect.query(sqlGood, (errUpgrade, update) => {
                                    if(errUpgrade) return res.writeHead(400, headers).end(JSON.stringify({update: false, err: errUpgrade}));
                
                                    res.writeHead(200, headers).end(JSON.stringify({update: true}));
                
                                });

                            });
                        });

                    });

                });

            }else { 

                // Изменение данных о товаре без изменинии рисунка
                let sqlGood = `UPDATE goods SET good_name=${goods.name}, good_desc=${goods.desc}, good_price=${goods.price}, good_amount=${goods.amount} WHERE id=${goods.id}`;
                connect.query(sqlGood, (errUpgrade, update) => {
                    if(errUpgrade) return res.writeHead(400, headers).end(JSON.stringify({update: false, err: errUpgrade}));

                    res.writeHead(200, headers).end(JSON.stringify({update: true}));

                });
            };

        });
    };  
 
};