import React, {useState} from 'react';
import { render } from 'react-dom';
import { TextField, Box, Button, ListItem, ListItemText, InputLabel, FilledInput } from '@mui/material';
import {Head, Nav} from '../header.jsx';
import '../../assets/sass/Auth.sass';
import NumberFormat from 'react-number-format';

const lang = localStorage.getItem('lang');
const date = new Date();

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
                firstName: 'Фамилия',
                lastName: 'Имя',
                patronicName: 'Отчество',
                phone: 'Ваш номер',
                email: 'Email',
                password: 'Пароль'
            };
            placeholders = {
                firstName: 'Введите Фамилию',
                lastName: 'Введите Имя',
                patronicName: 'Введиет Отчество',
                phone: 'Введите номер',
                email: 'example@mail.com',
                password: 'Введите пароль'            
            };
            break;

        case 'EN':
            caption = 'Sign Up';
            valueSubmit = 'Sign Up';
            valueLabels = {
                firstName: 'First Name',
                lastName: 'Last Name',
                patronicName: 'Patronic Name',
                phone: 'Phone',
                email: 'Email',
                password: 'Password'
            };
            placeholders = {
                firstName: 'Your First Name',
                lastName: 'Your Last Name',
                patronicName: 'Your Patric Name',
                phone: 'Your number',
                email: 'example@mail.com',
                password: 'password'            
            };
            break;

        default:
            caption = 'Регистрация';
            valueSubmit = 'Зарегистрироваться';
            valueLabels = {
                firstName: 'Фамилия',
                lastName: 'Имя',
                patronicName: 'Отчество',
                phone: 'Ваш номер',
                email: 'Email',
                password: 'Пароль'
            };
            placeholders = {
                firstName: 'Введите Фамилию',
                lastName: 'Введите Имя',
                patronicName: 'Введиет Отчество',
                phone: 'Введите номер',
                email: 'example@mail.com',
                password: 'Введите пароль'            
            };
            break;
    };



    // Значение форм
    let [form, setForm] = useState({
        firstName: '',
        lastName: '',
        patronicName: '',
        phone: '',
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
    let validPass = false;
    if(form.password < 3) {

        validPass = true;

    }else{

        validPass = false

    };


    // Отправка данных на сервер с помощью Fetch
    let dateRegis = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    function sendData() {

        fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                patronicName: form.patronicName,
                phone: form.phone,
                email: form.email,
                dateRegis,
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

            <InputLabel htmlFor='firstName'>
                {valueLabels.firstName}
            </InputLabel>
            <TextField
                name='firstName'
                id='firstName'
                type='text'
                variant={variantForm}
                placeholder={placeholders.firstName}
                value={form.firstName}
                onChange={update}
            />

            <InputLabel htmlFor='lastName'>
                {valueLabels.lastName}
            </InputLabel>
            <TextField
                name='lastName'
                id='lastName'
                type='text'
                variant={variantForm}
                placeholder={placeholders.lastName}
                value={form.lastName}
                onChange={update}
            />


            <InputLabel htmlFor='patronicName'>
                {valueLabels.patronicName}
            </InputLabel>
            <TextField
                name='patronicName'
                id='patronicName'
                type='text'
                variant={variantForm}
                placeholder={placeholders.patronicName}
                value={form.patronicName}
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