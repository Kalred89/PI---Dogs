import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog, getAllTemperaments, getAllDogs } from "../../Slice/docSlice";

export default function DogCreation (){
    const dispatch = useDispatch();
    const { dogs, temperaments } = useSelector((state) => state.dogsSlice);
    const [input, setInput] = useState({
        name: '',
        height: '',
        heightMin: '',
        heightMax: '',
        weight: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        temperament: [],
        image: ''
    })

    useEffect(()=>{
        dispatch(getAllTemperaments())
        dispatch(getAllDogs());
    },[dispatch])

    function handleSubmit (e){
        e.preventDefault();
        input.height = `${input.heightMin} - ${input.heightMax}` ;
        input.weight = `${input.weightMin} - ${input.weightMax}` ;
        console.log('input:', input);
        dispatch(postNewDog(input));
        setInput({
            name: '',
            height: '',
            heightMin: '',
            heightMax: '',
            weight: '',
            weightMin: '',
            weightMax: '',
            life_span: '',
            temperament: [],
            image: ''
        })
    }

    function handleInputChange(e){ 
        setInput(
            {...input, [e.target.name]: e.target.value}
        );  
    }

    function handleTemperament(){

    }

    console.log(dogs.length);
    console.log(dogs);
    return (
        <div>
            <Link to='/home'><button>Go back</button></Link>
            <h1>Complete the form below to create your own new dog breed!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Breed: </label>
                    <input className={''}
                        type="text" 
                        name='name' 
                        placeholder='Enter a name for your new dog...' 
                        value={input.name}
                        onChange={handleInputChange}
                    />
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Height - Min & Max </label>
                    <input className={''}
                        type="text" 
                        name='heightMin' 
                        placeholder='Enter MINIMUM height in cm...' 
                        value={input.heightMin}
                        onChange={handleInputChange}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='heightMax' 
                        placeholder='Enter MAXIMUM height in cm...' 
                        value={input.heightMax}
                        onChange={handleInputChange}
                    />
                    <label> Cm</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Weight - Min & Max </label>
                    <input className={''}
                        type="text" 
                        name='weightMin' 
                        placeholder='Enter MINIMUM weight in cm...' 
                        value={input.weightMin}
                        onChange={handleInputChange}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='weightMax' 
                        placeholder='Enter MAXIMUM weight in cm...' 
                        value={input.weightMax}
                        onChange={handleInputChange}
                    />
                    <label> kg</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Life expectency: </label>
                    <input className={''}
                        type="text" 
                        name='life_span' 
                        placeholder='Enter life expectency in years...' 
                        value={input.life_span}
                        onChange={handleInputChange}
                    />
                    <label> Years</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Select temperaments: </label>
                    <select onChange={e => handleTemperament(e)}>
                        <option key={0} value="noTemp">Select a temperament...</option>
                        {
                        temperaments.map(temp =>
                        <option key={temp.id} value={temp.name}>{temp.name}</option> )}
                    </select>
                </div>
                <br/>
                <hr />
                <br />
                {/* <div>
                    <label>Image: </label>
                    <input className={''}
                        type="file" 
                        name='image' 
                        placeholder='Add an image to your new dog' 
                        value={''}
                        onChange={handleInputChange}
                    />
                </div>
                <br/>
                <hr />
                <br /> */}
                <div>
                    <input type="submit" value='Submit'/>
                </div>
            </form>
        </div>
    )

}

// Ruta de creación de raza de perro: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro