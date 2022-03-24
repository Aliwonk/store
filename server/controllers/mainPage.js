import path from 'path';

export class MainPage {

    //Загрузка html файла главной страницы
    get(req, res) {
        res.sendFile(path.resolve('client', 'dist/pages/main.html'))
    };

};