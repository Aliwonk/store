import { Button, ButtonGroup, FormControl, TextField} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { render } from 'react-dom';
import '../../assets/sass/Admin.sass';
import { Goods } from './goods.jsx';
import { UserProfile, UsersTable } from './users.jsx';
 

render(
    <div>
        <ToolBar />
    </div>,
    document.getElementById('root')
);

// Страница админа
export function ToolBar() {
    const lang = localStorage.getItem('lang');

    // Текст в зависимости языка

        // кнопки панеля инструмента
    let values;

    switch (lang) {
        case 'RU':
            values = {
                btn1: 'Пользователи',
                btn2: 'Товары',
            };
            break;
        case 'EN':
            values = {
                btn1: 'Users',
                btn2: 'Goods',
            };
            break;
        default:
            values = {
                btn1: 'Пользователи',
                btn2: 'Товары'
            };
            break;
    };


    function clickBtnTool(e) {
        e.stopPropagation();

        // получение информации открыта ли профиль пользователя
        let profileOpen = localStorage.getItem('profileOpen');

        // блок таблицы пользователей
        let usersTable = document.querySelector('.usersTable');
        // блок профиля пользователя
        let userProfile = document.querySelector('.userProfile');
        // блок товара
        let goods = document.querySelector('.goods');


        // Нажатие кнопок панеля инструмента
        // Правая линия кнопок
        let lineBtns = document.querySelector('.lineBtns');


        // получение id кнопки
        let id = e.target.id;

        switch (id) {
            // Нажатие на кнопку инструмента пользователя
            case 'btnToolUsers':
                if (profileOpen) {
                    // оставить открытой профиль
                    userProfile.classList.remove('hidden');

                    // закрыть таблицу пользователей
                    usersTable.classList.add('hidden');
                }else{

                     // открытие таблицу пользователя
                     usersTable.classList.remove('hidden');

                     // закрыть профиль
                     userProfile.classList.add('hidden');

                };
                // Закрытие блока товаров
                goods.classList.add('hidden');
                break;

            // Нажатие на кнопку инструмента товары
            case 'btnToolGood':
                // Закрытие блока пользователя
                usersTable.classList.add('hidden');
                userProfile.classList.add('hidden');

                // Открытие блока товаров
                goods.classList.remove('hidden');
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
                <UsersTable />
                <UserProfile />
                <Goods />

            </Box>
        </Box>

    )

};