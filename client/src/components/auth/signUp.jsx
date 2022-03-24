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
        <FormSignUp variantForm='standard'/>
    </div>,
    document.getElementById('root')
);


function FormSignUp(props) {

    let variantForm = props.variantForm;


    // Язык текста в зависмости языка
    let valueSubmit,
    caption,
    valueLabels,
    placeholders;
    switch (lang) {
        case 'RU':
            caption = 'Регистрация';
            valueSubmit = 'Зарегистрироваться';
            valueLabels = {
                name: 'Ваше имя',
                email: 'Email',
                phone: 'Ваш номер',
                password: 'Пароль'
            };
            placeholders = {
                name: 'Введите имя',
                email: 'example@mail.com',
                phone: 'Введите номер',
                password: 'Введите пароль'            
            };
            break;

        case 'EN':
            caption = 'Sign Up';
            valueSubmit = 'Sign Up';
            valueLabels = {
                name: 'Name',
                email: 'Email',
                phone: 'Phone',
                password: 'Password'
            };
            placeholders = {
                name: 'Your name',
                email: 'example@mail.com',
                phone: 'Your number',
                password: 'password'            
            };
            break;

        default:
            caption = 'Регистрация';
            valueSubmit = 'Зарегистрироваться';
            valueLabels = {
                name: 'Ваше имя',
                email: 'Email',
                phone: 'Ваш номер',
                password: 'Пароль'
            };
            placeholders = {
                name: 'Введите имя',
                email: 'example@mail.com',
                phone: 'Введите номер',
                password: 'Введите пароль'            
            };
            break;
    };



    // Значение форм
    let [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const update = e => {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    };

    
    // Валидация форм
    let validPass = false;
    if(form.password < 3) {

        validPass = true;

    }else{

        validPass = false

    };


    // Отправка данных на сервер с помощью Fetch
    function sendData() {

        fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                phone: form.phone,
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

            <InputLabel htmlFor='name'>
                {valueLabels.name}
            </InputLabel>
            <TextField
                name='name'
                id='name'
                type='text'
                variant={variantForm}
                placeholder={placeholders.name}
                value={form.name}
                onChange={update}
            />

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
            
            <InputLabel htmlFor='phone'>
                {valueLabels.phone}
            </InputLabel>
            <NumberFormat id='phone' customInput={TextField} value={form.phone} name='phone' variant={variantForm} placeholder={placeholders.password} format='+7 (###) ###-####' onChange={update} />

            <InputLabel htmlFor='password'>
                {valueLabels.password}
            </InputLabel>
            <TextField 
                error={validPass}
                name='password'
                id='password'
                type='password'
                variant='standard'
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