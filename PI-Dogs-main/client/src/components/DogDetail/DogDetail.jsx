import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {getDogDetails} from '../../Slice/docSlice';

export default function Details (props){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getDogDetails(props.match.params.id));
    },[dispatch, props.match.params.id])

    const { dogDetails }  = useSelector((state) => state.dogsSlice);

    return (
        <div>
            {dogDetails
            ?<div key={dogDetails.id} >
                <img src={dogDetails.image} alt={dogDetails.name} width='350px' height='350px'/>
                <p>Name: {dogDetails.name}</p>
                <p>Weight: {dogDetails.weight} kg.</p>
                <p>Height: {dogDetails.height} Cm.</p>
                <p>Life span: {dogDetails.life_span}</p>
                <p>Temperament: {dogDetails.temperament}</p>
            </div>
            :  <p>Loading...</p>     
            }
            <Link to='/home'><button>Go back</button></Link>
        </div>
    )
}

// Ruta de detalle de raza de perro: debe contener

// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida