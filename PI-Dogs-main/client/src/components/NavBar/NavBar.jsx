import React from 'react';
import { NavLink } from 'react-router-dom';
import Style from '../NavBar/navbar.module.css'

export default function NavBar() {
    return (
        <header className={Style.navbar}>
            <nav>
                <ul className={Style.list}>
                    <li className={Style.listItems}>
                        <NavLink exact to="/" >Landing Page</NavLink>
                        <NavLink exact to="/home" >Home</NavLink>
                        <NavLink to="/CreateDog" >Create a Dog</NavLink>  
                    </li>
                </ul>        
            </nav>
        </header>
        
    )
}