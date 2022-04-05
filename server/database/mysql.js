// import Sequalize from 'sequelize';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('server', '.env')});

const conn = mysql.createConnection({
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
});

export function MysqlDB(callback) {
    
    conn.connect(err => {
        if(err) return callback(new Error(`Error connect Mysql: ${err}`));

        callback(null, conn);
    });

};