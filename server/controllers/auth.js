import path from 'path';
import { MysqlDB } from '../database/mysql.js';
import bcryptjs from 'bcryptjs';


let salt = bcryptjs.genSaltSync(10);

export class Auth {

    // Загрузка html страницу регистрации
    getSignUp(req, res) {

        res.sendFile(path.resolve('client', 'dist/pages/signUp.html'));

    };

    // Загрузка html страницу входа
    getSignIn(req, res) {

        res.sendFile(path.resolve('client', 'dist/pages/signIn.html'))

    };

    // Регистрация пользователя 
    postSignUp(req, res) {
        if(!req.body) return res.sendStatus(400).send('Unknown request');

        let hashPass;
        // проверка валидности данных пользователя
        if(req.body.password < 2) {
            
            return res.writeHead(404, {
                'Content-Type' : 'application/json'
            }).end(JSON.stringify({ validPass : false }));

        }else{

            // хэширование пароля
            hashPass = bcryptjs.hashSync(req.body.password, salt);

        };

        // данные пользователя
        let user = {
            name : '"' + req.body.name + '"',
            email : '"' + req.body.email + '"',
            phone : '"' + req.body.phone + '"',
            password : '"' + hashPass + '"'
        };

        console.log(user);
        // сохранение данных пользователя в Mysql
        MysqlDB((err, connect) => {
            if(err) return console.error(err);


            let sql = `INSERT INTO users(name, email, phone, password) VALUES (${user.name}, ${user.email}, ${user.phone}, ${user.password})`;
            connect.query(sql, (error, result, field) => {
                
                // отправка ошибка если не произошла сохранение
                if(error) {
                    return res.writeHead(200, {
                        'Content-Type' : 'application/json'
                    }).end(JSON.stringify({result : false, error: error}));
                };

                // при успешном сохранении
                res.writeHead(200, {
                    'Content-Type' : 'application/json'
                }).end(JSON.stringify({result : true}));
            });
        });
    };


    // Сравнение данных пользователя с данными в Mysql
    postSignIn(req, res) {
        if(!req.body) return res.sendStatus(400).send('Unlnown request');
        
        // валидация пароля пользователя
        console.log(req.body.password.length);
        if(req.body.password.length < 2) {
            
            return res.writeHead(404, {
                'Content-Type' : 'application/json'
            }).end(JSON.stringify({ validPass : false }));

        };

        let user = {
            email: '"' + req.body.email + '"',
            password: req.body.password
        };


        MysqlDB((err, connect) => {
            if(err) return console.error(err);

            let sql = `SELECT * FROM users WHERE email=${user.email}`;
            
            // Получение данных с Mysql 
            connect.query(sql, (error, data, field) => {
                if(error) return console.log(error);


                // Проверка email
                if(data == '') {
                    
                    res.writeHead(404, {
                        'Content-Type' : 'application/json'
                    }).end(JSON.stringify({ checkEmail: false }));
                    
                }else {
                 
                    // Проверка пароля
                    let checkPass = bcryptjs.compareSync(user.password, data[0].password);
                
                    if(checkPass === true) {
                        
                        res.writeHead(200, {
                            'Content-Type' : 'application/json'
                        }).end(JSON.stringify({ checkPass }));
                        
                    }else{

                        res.writeHead(404, {
                            'Content-Type' : 'application/json'
                        }).end(JSON.stringify({ checkPass }));

                    };

                }

            });

        });
    };
};