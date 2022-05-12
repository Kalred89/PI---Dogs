import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';
import defaultDog from '../../Multimedia/defaultDog.png'
import './dogdetail.css'
import axios from 'axios';
import spinner from '../../Multimedia/spinner.gif'

export default function Details (props){
    const [dogDetails, setDogDetails]  = useState([]);

    const getDogDetails = async () => {
        const getDog = await axios.get(`http://localhost:3001/dogs/${props.match.params.id}`)
        setDogDetails(getDog.data)
    }

    useEffect(()=>{
        getDogDetails();
    },[]) 
    
    return (
        <div className='dogDetail'>
            {dogDetails.id
            ?<div key={dogDetails.id} className='Card'>
                <h2>{dogDetails.name}</h2>
                <img src={dogDetails.image ? dogDetails.image : defaultDog} alt={dogDetails.name} width='350px' height='350px' className='Image'/>
                <div className='dogInfo'>
                    {/* <p><strong>Breed: </strong>{dogDetails.name}</p> */}
                    <label><u><strong>Breed Details:</strong></u></label>
                    <br />
                    <p><strong>Weight: </strong> {dogDetails.weight} kg.</p>
                    <p><strong>Height: </strong>  {dogDetails.height} Cm.</p>
                    <p><strong>Life expectancy: </strong> {dogDetails.life_span?.includes('years') ? dogDetails.life_span : `${dogDetails.life_span} year(s)`}</p>
                    <p><strong>Temperament: </strong>  {dogDetails.temperament ? dogDetails.temperament : dogDetails.temperaments?.map(t => t.name).join(' , ')}</p>
                </div>
            </div>
            :  <div className='loading'><img src={spinner} alt='LoadingImage' width='250px' height='250px' /> </div>   
            }
            <Link to='/home'><button className='back'>◀ Go back</button></Link>
        </div>
    )
}

// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida