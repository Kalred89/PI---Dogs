import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog, getAllTemperaments, getAllDogs } from "../../Slice/docSlice";

export default function DogCreation (){
    const dispatch = useDispatch();
    const history = useHistory();
    const selectRef= useRef();
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
        console.log('input:', input.temperament);
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
            image: '',
        })
        selectRef.current.value = 0;
        // history.push('/home');
    }

    function handleInputChange(e){ 
        setInput(
            {...input, [e.target.name]: e.target.value}
        ); 
    }

    function handleTemperament(e){
        if(e.target.value !=='0' && !input.temperament.includes(e.target.value)){
            setInput({
                ...input, temperament: [...input.temperament, e.target.value]
            });
        }else if (input.temperament.includes(e.target.value)) {
            window.alert(`Your dog already has this temperament, please select a different one.`);
        }
    }

    function onClose(temp) {
        setInput({
            ...input, temperament: [input.temperament.filter(t => t !== temp)]
        });
    }
    // console.log(input);
    // console.log(dogs.length);
    // console.log(dogs);
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
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='heightMax' 
                        placeholder='Enter MAXIMUM height in cm...' 
                        value={input.heightMax}
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='weightMax' 
                        placeholder='Enter MAXIMUM weight in cm...' 
                        value={input.weightMax}
                        onChange={(e) => handleInputChange(e)}
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
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> Years</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Select temperaments: </label>
                    <select onChange={e => handleTemperament(e)} ref={selectRef}>
                        <option key={0} value={0}>Select a temperament...</option>
                        {
                        temperaments.map(temp =>
                        <option key={temp.id} value={temp.name}>{temp.name}</option> )
                        }
                    </select>
                    <div>
                        <ul>
                            <li>{
                                input.temperament.map(temp => 
                                <div key={temp}>
                                    <p>{temp}</p>
                                    <button onClick={() => onClose(temp)}>X</button>
                                </div>)
                            }</li>
                        </ul>
                    </div>
                    
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Image: </label>
                    <input className={''}
                        type="text" 
                        name='image' 
                        placeholder='Add an image to your new dog' 
                        value={input.image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <br/>
                <hr />
                <br />
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