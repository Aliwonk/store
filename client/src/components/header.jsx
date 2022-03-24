import React, {useState} from "react";
import { headerMenu } from "../assets/texts.js";
import '../assets/sass/Header.sass'

let langLS = localStorage.getItem('lang');
export function Head() {
    const [lang, setLang] = useState();

    // Изменеие языка и сохранение на localStorage
    function changeLang(e) {
        setLang(e.target.value);

        localStorage.setItem('lang', e.target.value);
        location.reload();
    };


    // Изменение текста аворизации аккаунта в зависимости от языка
    let valueAccount,
    btnValueSignIn,
    btnValueSignUp;

    switch (langLS) {
        case 'RU':
            valueAccount = 'Мой аккаунт';
            btnValueSignIn = 'Войти';
            btnValueSignUp = 'Регистрация';
            break;
        
        case 'EN':
            valueAccount = 'My accoount';
            btnValueSignIn = 'Sign In';
            btnValueSignUp = 'Sign Up';
            break;

        default:
            valueAccount = 'Мой аккаунт';
            btnValueSignIn = 'Войти';
            btnValueSignUp = 'Регистрация';
            break;
    };

    // Изменение текста кнопки языка 
    let value,
    t1;

    switch (langLS) {
        case 'RU':
            value = 'RU';
            t1 = 'Выбрать язык';
            break;
        case 'EN':
            value = 'EN';
            t1 = 'Select language';
            break;

        default:
            value = 'RU';
            t1 = 'Выбрать язык';
            break;
    };

    return(

        <header>

            <div className="btns">
                
                {/* Личный кабинет */}
                <div className="account">

                    {/* Кнопка войти */}
                    <div className="signIn">
                        <a href="signIn">
                            {btnValueSignIn}
                        </a>
                    </div>

                    {/* Кнопка  регистрации*/}
                    <div className="signUp">
                        <a href="signUp">
                            {btnValueSignUp}
                        </a>
                    </div>
                </div>

                {/* Кнопка изменения языка */}
                <select className="btnLang" onChange={changeLang} value={value}>
                    <option disabled>{t1}</option>
                    <option name="RU" value="RU">Русский</option>
                    <option name="EN" value="EN">English</option>
                </select>
            </div>

        </header>
    )

};

export function Nav() {
    
    let textMenu,
    linksMenu;

    switch (langLS) {
        case 'RU':
            textMenu = ['Главная', 'текст', 'текст', 'текст'];
            linksMenu = ['/', '#', '#', '#',];
            break;
            
        case 'EN':
            textMenu = ['Home', 'text', 'text', 'text'];
            linksMenu = ['/', '#', '#', '#',];
            break;

        default:
            textMenu = ['Главная', 'текст', 'текст', 'текст'];
            linksMenu = ['/', '#', '#', '#',];
            break;
    };

    // Элементы меню
    let menuEl = textMenu.map((list, index) => {

        return(

            <div className="menu__el" key={index}>
                <a href={linksMenu[index]}>{list}</a>
            </div>

        );
    });

    return(

        <nav>
            <div className="logotype">
                <a href="/">
                    Logogtype
                </a>
            </div>
            <div className="menu">
                {menuEl}    
            </div>
            <div className="basket"></div>
        </nav>

    )

};