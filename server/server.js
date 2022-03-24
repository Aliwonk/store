import http from 'http';
import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config({ path :  './server/.env'});

const port = process.env.PORT || 3000,
host = process.env.HOSTNAME || 'localhost'


http.createServer(app)
.listen(port, host)
.addListener('listening', () => {

    console.info(`Server work http://${host}:${port}`);

});