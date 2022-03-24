import React from 'react';
import '../../assets/sass/MainPage.sass';
import imgBanner from '../../assets/img/mainFon.jpg';
import { Box } from '@mui/system';


export function Banner() {

    return(

        <Box className='banner' sx={{backgroundImage : `url(${imgBanner})`}} >
            
        </Box>

    )

};