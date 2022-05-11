import React from 'react';
import './pagination.css'

export default function Pagination ({currentPage, dogsPerPage, showDogs, pagination}){
    const pageNumbers = [];

    for(let i = 0; i <= Math.floor(showDogs/dogsPerPage); i++){
        pageNumbers.push(i+1);
    }

    // console.log(currentPage);

    return (
        <nav className='component-pagination'>
            <ul>
                { pageNumbers && pageNumbers.map( number => (
                    <li key={number} >
                        <a className={currentPage === number ? 'active' : null} href={'#'+number} onClick={() => pagination(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}