import React, {useState} from 'react';
import { render } from 'react-dom';
import { TextField, Box, Button, ListItem, ListItemText, InputLabel, FilledInput } from '@mui/material';
import {Head, Nav} from '../header.jsx';
import '../../assets/sass/Auth.sass';
import NumberFormat from 'react-number-format';

const lang = localStorage.getItem('lang');

render(
    <div>
        <Head />
        <Nav />
        <FormSignIn variantForm='standard'/>
    </div>,
    document.getElementById('root')
);


function FormSignIn(props) {

    let variantForm = props.variantForm;


    // Язык текста в зависмости языка
    let valueSubmit,
    caption,
    valueLabels,
    placeholders;
    switch (lang) {
        case 'RU':
            caption = 'Вход';
            valueSubmit = 'Войти';
            valueLabels = {
                email: 'Email',
                password: 'Пароль'
            };
            placeholders = {
                email: 'example@mail.com',
                password: 'Введите пароль'            
            };
            break;

        case 'EN':
            caption = 'Sign In';
            valueSubmit = 'Sign In';
            valueLabels = {
                email: 'Email',
                password: 'Password'
            };
            placeholders = {
                email: 'example@mail.com',
                password: 'password'            
            };
            break;

        default:
            caption = 'Вход';
            valueSubmit = 'Войти';
            valueLabels = {
                email: 'Email',
                password: 'Пароль'
            };
            placeholders = {
                email: 'example@mail.com',
                password: 'Введите пароль'            
            };
            break;
    };



    // Значение форм
    let [form, setForm] = useState({
        email: '',
        password: ''
    });

    const update = e => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    
    // Валидация форм
    let validPass;
    
    if(form.password.length < 6) {

        validPass = true;

    }else{

        validPass = false

    };


    // Отправка данных на сервер с помощью Fetch
    function sendData() {

        fetch('/signIn', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                email: form.email,
                password: form.password
            })
        }).then(res => res.json())
        .then(result => console.log(result));

    };


    return(

        <Box
            className='form'
            component='form'
        >
            <h3>{caption}</h3>

            <InputLabel htmlFor='email'>
                {valueLabels.email}
            </InputLabel>
            <TextField 
                name='email'
                id='email'
                type='text'
                variant={variantForm}
                placeholder={placeholders.email}
                value={form.email}
                onChange={update}
            />

            <InputLabel htmlFor='password'>
                {valueLabels.password}
            </InputLabel>
            <TextField 
                error={validPass}
                name='password'
                id='password'
                type='password'
                variant={variantForm}
                placeholder={placeholders.password}
                value={form.password}
                onChange={update}
            />

            <Button
                className='btnSubmit'
                variant='contained'
                onClick={sendData}
            >{valueSubmit}</Button>
        </Box>

    )
};
