import React from "react";

export default function DogCard({id, name, image, weight, temperament, temperaments}) {
    return (
        <div key={id} className='Card'>
            <img src={image} alt={name} width='350px' height='350px' className='Image'/>
            <p>Name: {name}</p>
            <p>Weight: {weight} kg.</p>
            <p>Temperament: {temperament  ? temperament : temperaments}</p>
        </div>  
    )
}

