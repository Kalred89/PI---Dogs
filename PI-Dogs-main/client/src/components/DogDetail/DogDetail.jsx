import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {getDogDetails} from '../../Slice/docSlice';
import defaultDog from '../../Multimedia/defaultDog.png'
import './dogdetail.css'

export default function Details (props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogDetails(props.match.params.id));
    },[dispatch, props.match.params.id])

    const { dogDetails }  = useSelector((state) => state.dogsSlice);

    return (
        <div className='dogDetail'>
            {dogDetails
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
            :  <p>Loading...</p>     
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