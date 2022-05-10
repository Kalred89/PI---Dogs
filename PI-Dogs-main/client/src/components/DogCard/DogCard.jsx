import React from "react";
import './dogcard.css'

export default function DogCard({id, name, image, weight, temperament, temperaments}) {
    return (
        <div key={id} className='Card'>
            <img src={image} alt={name} className='Image'/>
            <div className='dogInfo'>
                <p><strong>Name: </strong>{name}</p>
                <p> <strong>Weight: </strong>{weight} kg.</p>
                <p><strong>Temperament: </strong> {temperament  ? temperament : temperaments}</p>
            </div>
        </div>  
    )
}

