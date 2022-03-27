import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, ButtonGroup, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState} from 'react';
import '../../assets/sass/Admin.sass';
 
// Страница админа
export function ToolBar() {
    const lang = localStorage.getItem('lang');

    // Текст в зависимости языка

        // кнопки панеля инструмента
    let values;
        // шапка таблицы пользователей
    let usersTableHeader;
        // название таблицы в профиле пользователя
    let profileTableName;

    // Получение данных пользователя
    const [tableRows, setRows] = useState([]);

    useEffect(() => {
        fetch('/api/users', {
            'Content-Type' : 'application/json'
        })  
        .then(res => res.json())
        .then(data => setRows(data));
    }, []);


    switch (lang) {
        case 'RU':
            values = {
                btn1: 'Пользователи',
                btn2: 'Товары',
            };
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
                fullAdress: 'Адресс',
                amountOrder: 'Количество Заказов',
                totalAmountOrder: 'Общая Сумма Заказов'
            };
            profileTableName = {
                detail: 'Детали',
                order: 'Заказы'
            };
            break;
        case 'EN':
            values = {
                btn1: 'Users',
                btn2: 'Goods',
            };
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
            values = {
                btn1: 'Пользователи',
                btn2: 'Товары'
            };
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
                fullAdress: 'Адресс',
                amountOrder: 'Количество Заказов',
                totalAmountOrder: 'Общая Сумма Заказов'
            };
            profileTableName = {
                detail: 'Детали',
                order: 'Заказы'
            };
            break;
    };


    const [value, setValue] = useState(1);

    function update(e, newValue) {
        setValue(newValue);
    };


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
    // блок товара
    let goods = document.querySelector('.goods');


    // Открытие профиля пользователя
    function openProfileUser(e) {
        // Получение id пользователя
        let id = e.target.children[0].value;

        // закрытие таблицы пользователей
        usersTable.classList.add('hidden');

        // открытие профиля пользователя
        userProfile.classList.remove('hidden');

        // Получение данных пользователя по id;
        fetch(`/admin/user/${id}`)
        .then(res => res.json())
        .then(data => {
            
            userId.textContent = data[0].id;
            userFullName.textContent = `${data[0].firstName} ${data[0].lastName} ${data[0].patronicName}`;
            userDateRegis.textContent = data[0].dateRegis;

        })
        .catch(err => console.log(err));
    };


    // Нажатие кнопок панеля инструмента
    // Правая линия кнопок
    let lineBtns = document.querySelector('.lineBtns');

    function clickBtnTool(e) {
        e.stopPropagation();

        // получение id кнопки
        let id = e.target.id;

        switch (id) {
            // Нажатие на кнопку инструмента пользователи
            case 'btnToolUsers':
                console.log(1);
                // открытие блока пользователя
                usersTable.classList.remove('hidden');

                // Закрытие блока товаров
                goods.classList.add('hidden');
                break;

            // Нажатие на кнопку инструмента товары
            case 'btnToolGood':
                // Закрытие блока пользователя
                usersTable.classList.add('hidden');
                userProfile.classList.add('hidden');

                // Открытие блока товаров
                goods.classList.remomve('hidden');   
                break;

            default:
                // открытие блока пользователя
                usersTable.classList.add('hidden');
                userProfile.classList.add('hidden')

                // Закрытие блока товаров
                goods.classList.remove('hidden');
                break;
        };

            // движение линии к нажатому кнопке
        lineBtns.style.marginTop = e.target.offsetTop + 'px';
        lineBtns.style.backgroundColor = 'rgb(25 118 210)';
        setTimeout(() => {
            lineBtns.style.backgroundColor = 'rgb(25 118 210 / 50%)';
        }, 200);
    };


    // Настройки таблицы
    let column = [
        {field: 'id', headerName: usersTableHeader.id, width: 150},
        {field: 'firstName', headerName: usersTableHeader.firstName, width: 200},
        {field: 'lastName', headerName: usersTableHeader.lastName, width: 200},
        {field: 'patronicName', headerName: usersTableHeader.patronicName, width: 200},
        {field: 'phone', headerName: usersTableHeader.phone, width: 150},
        {field: 'email', headerName: usersTableHeader.email, width: 350},
        {field: 'fullName', headerName: usersTableHeader.fullName, width: 150,
            valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''} ${params.row.patronicName || ''}`
        },
        {field: 'dateRegis', headerName: usersTableHeader.dateRegis, width: 200},
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
    return(

        <Box
            className='admin'
        >
            <Box className='toolBar'>
                <ButtonGroup 
                    variant='text'
                    orientation='vertical'
                    className='btns'
                >
                    <Button key={values.btn1} id='btnToolUsers' onClick={clickBtnTool}>{values.btn1}</Button>
                    <Button key={values.btn2} id='btnToolGoods' onClick={clickBtnTool}>{values.btn2}</Button>
                </ButtonGroup>
                <Box className='lineBtns'></Box>
            </Box>

            <Box
                className='block'
            >
                <Box className='usersTable'>
                    <DataGrid
                        columns={column}
                        rows={tableRows}
                    />       
                </Box>

                <Box className='userProfile hidden'>
                    <Box className='userInfo'>
                        <Paper elevation={3} className='table'>
                            <Typography className='captionTable'>{profileTableName.detail}</Typography>
                            <TableContainer className='tableUser'>
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
                
                <Box className='goods hidden'>
                    Goods
                </Box>
            </Box>
        </Box>

    )

};
