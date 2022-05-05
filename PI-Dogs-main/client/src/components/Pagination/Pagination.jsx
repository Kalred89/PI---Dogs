import React from 'react';
import './pagination.css'

export default function Pagination ({dogsPerPage, showDogs, pagination}){
    const pageNumbers = [];

    for(let i = 0; i <= Math.floor(showDogs/dogsPerPage); i++){
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            <ul className='pagination'>
                { pageNumbers && pageNumbers.map( number => (
                    <li className='number' key={number}>
                        <a href='#!' onClick={() => pagination(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}