import { Button, Card, CardActions, CardContent, CardMedia, Fade, FormControl, Paper, Snackbar, TextareaAutosize, TextField, Typography} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
export function Goods() {
    const lang = localStorage.getItem('lang');
    let text;

    switch (lang) {
        case 'RU':
            text = {
                good_name: 'Название',
                good_desc: 'Описание',
                good_price: 'Цена',
                good_amount: 'Количество',
                btnOpenForm: 'Добавить',
                btnCloseForm: 'Закрыть',
                btnEdit: 'Изменить',
                btnDel: 'Удалить',
                btnPhoto: 'Добавить Картинку',
                btnForm: 'Сохранить',
                resultAddGood: 'Успешно сохранен',
                resultDelGood: 'Товар удален'
            };
            break;
        case 'EN':
            text = {
                good_name: 'Name',
                good_desc: 'Description',
                good_price: 'Price',
                good_amount: 'Amount',
                btnOpenForm: 'Add',
                btnCloseForm: 'Close',
                btnEdit: 'Edit',
                btnDel: 'Delete',
                btnPhoto: 'Add Photo',
                btnForm: 'Save',
                resultAddGood: 'Save Good',
                resultDelGood: 'Good Delete'
            };
        break;
        default:
            text = {
                good_name: 'Название',
                good_desc: 'Описание',
                good_price: 'Цена',
                good_amount: 'Количество',
                btnOpenForm: 'Добавить',
                btnCloseForm: 'Закрыть',
                btnEdit: 'Изменить',
                btnDel: 'Удалить',
                btnPhoto: 'Добавить Картинку',
                btnForm: 'Сохранить',
                resultAddGood: 'Успешно сохранен',
                resultDelGood: 'Товар удален'
            };
            break;
    };

    // Вывод товаров
    const [good, setGood] = useState([]);
    const [goodImg, setImg] = useState([]);

    // Получение данных товара при входе в страницу
    useEffect(() => {
        fetch('/api/goods', {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((goods) => {
            setGood(goods);
    
            fetch('/api/goodsImg', {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then((good_img) => {
                setImg(good_img);
            });
    
        });
        
    }, []);

    // Функция обновление данных после редактирование или удаление товара без перезагрузки страницы
    function updateGoods() {
        fetch('/api/goods', {
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then((goods) => {
            setGood(goods);


            fetch('/api/goodsImg', {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(res => res.json())
            .then((good_img) => {
                setImg(good_img);
            });

        });
    };

    // Добавление товара
    function uploadGood(e) {
        let formData = new FormData();
        let good_img = e.target.elements.good_img.files[0],
        good_name = e.target.elements.good_name.value,
        good_desc = e.target.elements.good_desc.value,
        good_price = e.target.elements.good_price.value,
        good_amount = e.target.elements.good_amount.value,
        good_id = e.target.elements.good_id.value;    

        // Функция отправки товара на сервер
        function sendData(method, data, callback) {
            fetch('', {
                method: method,
                body: data
            })
            .then(res => res.json())
            .then(result => callback(null, result))
            .catch(err => callback(err, null))
        };

        if(good_id === '') {
            console.log(0)
            formData.append('good_img', good_img);
            formData.append('good_name', good_name);
            formData.append('good_desc', good_desc);
            formData.append('good_price', good_price);
            formData.append('good_amount', good_amount);
            formData.append('good_id', good_id);

            sendData('POST', formData, (err, result) => {
                if(err) console.log(err);
                console.log(result);
                if(result.save === true) {
                    updateGoods();
                    openCloseForm();
                }else {

                    console.log(result);
                }
            });

        }else {
            console.log(1);
            console.log(good_id);
            formData.append('good_img', good_img);
            formData.append('good_name', good_name);
            formData.append('good_desc', good_desc);
            formData.append('good_price', good_price);
            formData.append('good_amount', good_amount);
            formData.append('good_id', good_id);

            sendData('PUT', formData, (err, result) => {
                if(err) console.log(err);

                if(result.update === true) {
                    updateGoods();
                    openCloseForm();
                }else{

                    console.log(result);

                }
            });

        };

        e.preventDefault();
    };

    // Открытие формы добавление товара
    function openCloseForm(e) {
        let blockFormGood = document.querySelector('.addGood');
        let formGood = document.forms.formGood;
        let tableGood = document.querySelector('.goodsInfo');
        let btnAddGood = document.querySelector('.btnAddGood');

        blockFormGood.classList.toggle('hidden');
        tableGood.classList.toggle('hidden');

        // Проверка формы на наличие класса hidden
        blockFormGood.classList.forEach(element => {
            // Изменение текста кнопки закрытия формы
            if(element === 'hidden') {
                btnAddGood.textContent = text.btnOpenForm;
            }else{
                // При закрытии формы, чистим значение inputs и меняем текст кнопки
                btnAddGood.textContent = text.btnCloseForm;
                formGood.reset();
            }

        });

    };


    // Нажатие на кнопку редактирование товара
    function clickEditBtn(e) {
        openCloseForm();
        let formGood = document.forms.formGood;
        // Получение данных товара в карточке при нажатии на кнопку
        let card = e.target.parentElement.parentElement.childNodes[1];
        // данные товара в карточке
        let dataGood = {
            good_id: card.childNodes[0].textContent,
            good_name: card.childNodes[2].textContent,
            good_desc: card.childNodes[4].textContent,
            good_price: card.childNodes[6].textContent,
            good_amount: card.childNodes[8].textContent
        };

        // Изменение значений формы товара
        let inputs = formGood.elements; 
        inputs.good_name.value = dataGood.good_name;
        inputs.good_price.value = dataGood.good_price;
        inputs.good_amount.value = dataGood.good_amount;
        inputs.good_desc.value = dataGood.good_desc;
        inputs.good_id.value = dataGood.good_id;

    };

    // Удаление товара
    function delGood(e) {
        let idGood = e.target.childNodes[0].defaultValue
        let idImg = e.target.childNodes[1].defaultValue;
        fetch('', {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                good_del : {
                    id: idGood,
                    id_img: idImg
                }
            })
        })
        .then(res => res.json())
        .then(result => {
            if(result.delete === true) {
                updateGoods();
            }else{
                
            };
        });
    };

    // Таблица товаров
    let goodsCard = good.map((good, index) => {

        // перечисление рисунков товара
        return goodImg.map((img, indexImg) => {

            // нахождение рисунков товаров по id
            if(img.good_id === good.id) {

                return(
                    
                    <Card key={index} className='cards'>
                        <CardMedia 
                            component='img'
                            className='img'
                            height='100'
                            image={img.filename}
                            alt={good.good_name}
                        />
                        <CardContent className='content'>
                            <Typography hidden>{good.id}</Typography>
                            <Typography variant="body3" color="text.secondary">
                                {text.good_name}
                            </Typography>
                            <Typography variant='h4' component='div'>
                                {good.good_name}
                            </Typography>

                            <Typography variant="body3" color="text.secondary">
                                {text.good_desc}
                            </Typography>
                            <Typography variant="h2" className='goodDesc' component='div'>
                                {good.good_desc}
                            </Typography>

                            
                            <Typography variant="body3" color="text.secondary">
                                {text.good_price}
                            </Typography>
                            <Typography variant='h3' component='div'>
                                {good.good_price}    
                            </Typography>

                            <Typography variant="body3" color="text.secondary">
                                {text.good_amount}
                            </Typography>
                            <Typography variant='h3' component='div'>
                                {good.good_amount}    
                            </Typography>
                        </CardContent>
                        <CardActions className='btns'>
                            <Button size='small' onClick={clickEditBtn}>{text.btnEdit}</Button>
                            <Button size='small' onClick={delGood}>
                                <input name='good_id' defaultValue={good.id} hidden readOnly/>
                                <input name='good_img' defaultValue={img.good_id} hidden readOnly/>
                                {text.btnDel}
                            </Button>
                        </CardActions>

                    </Card>
                    
                )

            };
        });
    });

    return(
        <Box className='goods hidden'>
            <Button variant='contained' className='btnAddGood' size='small' onClick={openCloseForm}>{text.btnOpenForm}</Button>
            <Paper className='addGood hidden'>

                    <FormControl onSubmit={uploadGood} name='formGood' className='formGood' component='form' encType='multipart/form-data'>
                        <Button
                            color='secondary'
                            component='label'
                            className='btnImg'
                        >
                            <input name='good_img' type='file' hidden />
                            {text.btnPhoto}
                        </Button>
                        
                        <FormControl className='goodData'>
                            <TextField name='good_name' label='Name' type='text' variant='standard'/>
                            <TextField name='good_price' label='Price' type='number' variant='standard'/>
                            <TextField name='good_amount' label='Amount' type='number' variant='standard'/>
                            <TextField name='good_desc' label='Description' type='text' multiline rows={4}/>
                            <input name='good_id' type='number' variant='standard' hidden readOnly/>
                            <Button
                                variant='contained'
                                type='submit'
                            >
                                {text.btnForm}
                            </Button>
                        </FormControl>
                    </FormControl>
                    
            </Paper>
            <div className='goodsInfo'>
                <div className="caption">
                    {text.caption}
                </div>
                <div className='tableGood'>
                    {goodsCard}
                </div>
            </div>
        </Box>

    )

};