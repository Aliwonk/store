import React, {useState, useEffect} from "react";
import { Button, ButtonGroup, FormControl, Icon, IconButton, Input, InputLabel, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const lang = localStorage.getItem('lang');

// Текст в зависимости языка

    // шапка таблицы пользователей
let usersTableHeader;
    // название таблицы в профиле пользователя
let profileTableName;

    
switch (lang) {
    case 'RU':
        usersTableHeader = {
            id: 'ID',
            firstName: 'Фамилия',
            lastName: 'Имя',
            patronicName: 'Фамилия',
            phone: 'Телефон',
            email: 'Почта',
            dateRegis: 'Дата Регистрации',
            fullName: 'ФИО',
            profile: 'Профиль',
            btnText: 'Открыть',
            fullAdress: 'Адрес',
            amountOrder: 'Количество Заказов',
            totalAmountOrder: 'Общая Сумма Заказов'
        };
        profileTableName = {
            detail: 'Детали',
            order: 'Заказы'
        };
        break;
    case 'EN':
        usersTableHeader = {
            id: 'ID',
            firstName: 'First Name',
            lastName: 'Last Name',
            patronicName: 'Patronic Name',
            phone: 'Phone',
            email: 'Email',
            dateRegis: 'Date Registration',
            fullName: 'Full Name',
            profile: 'Profile',
            btnText: 'Open',
            fullAdress: 'Full Adress',
            amountOrder: 'Amount Order',
            totalAmountOrder: 'Total Amaunt Orders'
        };
        profileTableName = {
            detail: 'Details',
            order: 'Orders'
        };
        break;
    default:
        usersTableHeader = {
            id: 'ID',
            firstName: 'Фамилия',
            lastName: 'Имя',
            patronicName: 'Фамилия',
            phone: 'Телефон',
            email: 'Почта',
            dateRegis: 'Дата Регистрации',
            fullName: 'ФИО',
            profile: 'Профиль',
            btnText: 'Открыть',
            fullAdress: 'Адрес',
            amountOrder: 'Количество Заказов',
            totalAmountOrder: 'Общая Сумма Заказов'
        };
        profileTableName = {
            detail: 'Детали',
            order: 'Заказы'
        };
        break;
};


export function UsersTable() {


    // блок таблицы пользователей
    let usersTable = document.querySelector('.usersTable');
    // блок профиля пользователя
    let userProfile = document.querySelector('.userProfile');
        // блок id пользователя
    let userId = document.querySelector('#id');
        // блок ФИО пользователя
    let userFullName = document.querySelector('#fullName');
        // блок даты регистрации пользователя
    let userDateRegis = document.querySelector('#dateRegis');


    // Открытие профиля пользователя
    function openProfileUser(e) {
        // Получение id пользователя
        let id = e.target.children[0].value;

        // запись о том что кнопка нажата в localStorage
        localStorage.setItem('profileOpen', true);

        // закрытие таблицы пользователей
        usersTable.classList.add('hidden');

        // открытие профиля пользователя
        userProfile.classList.remove('hidden');

        // Получение данных пользователя по id;
        fetch(`/admin/user/${id}`)
        .then(res => res.json())
        .then(data => {
            
            userId.textContent = data[0].id;
            userFullName.textContent = `${data[0].first_name} ${data[0].last_name} ${data[0].patronic_name}`;
            userDateRegis.textContent = data[0].date_regis;

        })
        .catch(err => console.log(err));
    };



    // Настройки таблицы
    let column = [
        {field: 'id', headerName: usersTableHeader.id, width: 100},
        {field: 'first_name', headerName: usersTableHeader.firstName, width: 150},
        {field: 'last_name', headerName: usersTableHeader.lastName, width: 150},
        {field: 'patronic_name', headerName: usersTableHeader.patronicName, width: 150},
        {field: 'phone', headerName: usersTableHeader.phone, width: 180},
        {field: 'email', headerName: usersTableHeader.email, width: 250},
        {field: 'fullName', headerName: usersTableHeader.fullName, width: 150,
            valueGetter: (params) => `${params.row.first_name || ''} ${params.row.last_name || ''} ${params.row.patronic_name || ''}`
        },
        {field: 'date_regis', headerName: usersTableHeader.dateRegis, width: 150},
        {field: 'profile', headerName: usersTableHeader.profile, width: 100, renderCell: (params) => (
            <Button
                size='small'
                onClick={openProfileUser}
                sx={{fontFamily: "'Poiret One', cursive"}}
            >
                <input value={params.row.id} readOnly hidden/>
                {usersTableHeader.btnText}
            </Button>
        )}
    ];

    // Получение данных пользователя
    const [tableRows, setRows] = useState([]);

    useEffect(() => {
        fetch('/api/users', {
            'Content-Type' : 'application/json'
        })  
        .then(res => res.json())
        .then(data => setRows(data));
    }, []);

    return(

        <Box className='usersTable'>
        <DataGrid
            columns={column}
            rows={tableRows}
        />       
        </Box>
    )


};


export function UserProfile() {

     // Кнопка закрытия профиля пользователя
     function closeProfile(e) {
        e.stopPropagation();

        // блок таблицы пользователей
        let usersTable = document.querySelector('.usersTable');
        // блок профиля пользователя
        let userProfile = document.querySelector('.userProfile');


        // запись о том что профиль был закрыт
        localStorage.removeItem('profileOpen');

        // открытие таблицы пользователей
        usersTable.classList.remove('hidden');

        // закрытие блока профиля
        userProfile.classList.add('hidden');
    };

    return(

        <Box className='userProfile hidden'>
                    <Button
                        variant='contained'
                        onClick={closeProfile}
                    >Close</Button>
                    <Box className='tableUser'>
                        <Paper elevation={3} className='table'>
                            <Typography className='captionTable'>{profileTableName.detail}</Typography>
                            <TableContainer className='userInfo'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='tableCell'>{usersTableHeader.id}</TableCell>
                                        <TableCell className='tableCell'>{usersTableHeader.fullName}</TableCell>
                                        <TableCell className='tableCell'>{usersTableHeader.dateRegis}</TableCell>
                                        <TableCell className='tableCell'>{usersTableHeader.fullAdress}</TableCell>
                                        <TableCell className='tableCell'>{usersTableHeader.amountOrder}</TableCell>
                                        <TableCell className='tableCell'>{usersTableHeader.totalAmountOrder}</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    <TableRow >
                                        <TableCell id='id' className='tableCell'></TableCell>
                                        <TableCell id='fullName' className='tableCell'></TableCell>
                                        <TableCell id='dateRegis' className='tableCell'></TableCell>
                                        <TableCell id='fullAdress' className='tableCell'></TableCell> 
                                        <TableCell id='amountOrder' className='tableCell'></TableCell>
                                        <TableCell id='totalAmountOrders' className='tableCell'></TableCell>
                                    </TableRow>
                                </TableBody>
                            
                            </TableContainer>
                        </Paper>
                    </Box>
                </Box>


    )

};