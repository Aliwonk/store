import React from 'react';
import { render } from 'react-dom';
import { Head, Nav } from './components/header.jsx';
import { Banner } from './components/mainPage/main.jsx';

render(
    <div>
        <Head />
        <Nav />
        <Banner />
    </div>,
    document.getElementById('root')
);