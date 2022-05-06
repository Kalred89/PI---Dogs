import React from 'react';
import {Link} from 'react-router-dom';

export default function landingPage (){
    return (
        <div className='background'>
            <h1 >Welcome to my PI!</h1>
            <Link to='/home'>
                <button>Enter</button>
            </Link>
        </div>
    )
}


// Pagina inicial: deben armar una landing page con

// [ ] Alguna imagen de fondo representativa al proyecto
// [ ] Botón para ingresar al home (Ruta principal)