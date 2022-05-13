import React from 'react';
import './pagination.css'

export default function Pagination ({currentPage, dogsPerPage, showDogs, pagination}){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(showDogs/dogsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log('pagenumber:', pageNumbers);
    console.log('currentPage:', currentPage);
    const previos = currentPage === 1 ? 1 : currentPage-1;
    const next = currentPage === pageNumbers.length ? pageNumbers.length : currentPage+1
    return (
        <nav className='component-pagination'>
            <ul>
                <li>
                    <a className='previous' onClick={() => pagination(previos)} href={'#'+previos}>Prev</a>
                </li>
                { pageNumbers && pageNumbers.map( number => (
                    <li key={number} >
                        <a className={currentPage === number ? 'active' : null} href={'#'+number} onClick={() => pagination(number)}>{number}</a>
                    </li>
                ))}
                <li>
                    <a className='next' onClick={() => pagination(next)} href={'#'+next}>Next</a>
                </li>
            </ul>
        </nav>
    )
}