import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments, getAllDogs } from "../../Slice/docSlice";
import '../DogCreation/dogcreation.css'
import axios from "axios";

// Validations for the creation form
export function validate (input, dogs){
    let errors = {};

    if(!input.name || input.name === ''){
        errors.name = 'Name is required'
    }else if(dogs?.filter(dog => dog.name === input.name).length){
        errors.name = 'There already exists this dog breed. The dog breed has to be unique'
    }

    if(input.heightMin === '' || input.heightMax === ''){
        errors.height = 'Min & Max are both required'
    } if(!/^[0-9]+$/.test(input.heightMin) || !/^[0-9]+$/.test(input.heightMax)){  
        errors.height = 'Min & Max both have to be numbers'  
    } if(input.heightMin < 1 || input.heightMax < 1){
        errors.height = 'Min & Max both have to be greater than 0'
    }else if (input.heightMin > input.heightMax){
        errors.height = 'Minimum height can not be greater than maximun height'
    }

    if(input.weightMin === '' || input.weightMax === ''){
        errors.weight = 'Min & Max are both required'
    } if(!/^[0-9]+$/.test(input.weightMin) || !/^[0-9]+$/.test(input.weightMax)){
        errors.weight = 'Min & Max have to be numbers'
    } if(input.weightMin < 1 || input.weightMax < 1){
        errors.weight = 'Min & Max both have to be greater than 0'
    }else if (input.weightMin > input.weightMax){
        errors.weight = 'Minimum weight can not be greater than maximun weight'
    }

    if(input.life_span === ''){
        errors.life_span = 'Life expectancy is required'
    } if(!/^[0-9]+$/.test(input.life_span)){
        errors.life_span = 'Life expectancy has to be a number'
    }else if(input.life_span < 1){
        errors.life_span = 'Life expectancy has to be greater than 0'
    }

    if(input.temperament.length === 0){
        errors.temperament = 'At least one temperament is required'
    }
    return errors;
}

// Send the info to the back for the creation of the new dog
const postNewDog = async (payload) => {
    await axios.post(`http://localhost:3001/dog`, payload)
}

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
    const [errors, setErrors] = useState({});

    useEffect(()=>{
        dispatch(getAllTemperaments())
        dispatch(getAllDogs());
    },[dispatch])

    function handleSubmit (e){
        e.preventDefault();
        input.height = `${input.heightMin} - ${input.heightMax}` ;
        input.weight = `${input.weightMin} - ${input.weightMax}` ;
        if(!Object.keys(errors).length && ( input.name !== '' || input.heightMin !== '' | input.heightMax !== '' | input.weightMin !== '' | input.weightMax !== '' | input.life_span !== '' | input.temperament.length !== 0)){
            // console.log(input);
            postNewDog(input)
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
            setErrors({
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
            dispatch(getAllDogs());
            window.alert('Dog created successfully')
            history.push('/home');
        }else{
            window.alert('Please, complete the mandatory fields correctly')
        }
        
    }

    function handleInputChange(e){ 

        setErrors(validate(
            {...input, [e.target.name]: e.target.value}
        ,dogs)); 

        setInput(
            {...input, [e.target.name]: e.target.value}
        ); 
    }

    function handleTemperament(e){
        if(e.target.value !=='0' && !input.temperament.includes(e.target.value)){
            setErrors(validate(
                {
                ...input, temperament: [...input.temperament, e.target.value]
            },dogs));

            setInput({
                ...input, temperament: [...input.temperament, e.target.value]
            });

        }else if (input.temperament.includes(e.target.value)) {
            window.alert(`Your dog already has this temperament, please select a different one.`);
        }
        selectRef.current.value = "0";
    }

    function handleDelete(temp) {
        setInput({
            ...input, temperament: input.temperament.filter(t => t !== temp)
        });
    }

    return (
        <div className="create-form">
            <h1>Complete the form below to create your own new dog breed!</h1>
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
                <label className="obligatory">fields with <span>*</span> are obligatory.</label>
                <br/>
                <div>
                    <label>Dog Breed:<span> * </span></label>
                    <input className={errors.name && "danger"}
                        type="text" 
                        name='name' 
                        placeholder='Name...' 
                        value={input.name}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                    )}
                </div>
                <br/>
                <hr />
                <div>
                    <label>Height (Min/Max):<span> * </span> </label>
                    <input className={errors.height && "danger"}
                        type="number" 
                        name='heightMin' 
                        placeholder='MIN' 
                        value={input.heightMin}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={errors.height && "danger"}
                        type="number" 
                        name='heightMax' 
                        placeholder='MAX' 
                        value={input.heightMax}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label className="expressed">expressed in cm.</label>
                    {errors.height && (
                        <p className="danger">{errors.height}</p>
                    )}
                </div>
                <br/>
                <hr />
                <div>
                    <label>Weight (Min/Max):<span> * </span></label>
                    <input className={errors.weight && "danger"}
                        type="number" 
                        name='weightMin' 
                        placeholder='MIN' 
                        value={input.weightMin}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={errors.weight && "danger"}
                        type="number" 
                        name='weightMax' 
                        placeholder='MAX' 
                        value={input.weightMax}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label className="expressed">expressed in kg.</label>
                    {errors.weight && (
                        <p className="danger">{errors.weight}</p>
                    )}
                </div>
                <br/>
                <hr />
                <div>
                    <label>Life expectancy:<span> * </span></label>
                    <input className={errors.life_span && "danger"}
                        type="number" 
                        name='life_span' 
                        placeholder='Years' 
                        value={input.life_span}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {/* <label> years</label> */}
                    {errors.life_span && (
                        <p className="danger">{errors.life_span}</p>
                    )}
                </div>
                <br/>
                <hr />
                <div>
                    <label>Temperaments:<span> * </span> </label>
                    <select onChange={e => handleTemperament(e)} ref={selectRef} className={errors.temperament && "danger"}>
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
                                <div key={temp} className='selected-temps'>
                                    <p className='selected-text'>{temp}</p>
                                    <button className='selected-x' onClick={() => handleDelete(temp)}>X</button>
                                </div>)}
                            </li>
                        </ul>
                    </div>
                    {errors.temperament && (
                        <p className="danger">{errors.temperament}</p>
                    )}
                    
                </div>
                <br/>
                <hr />
                <div>
                    <label>Image: </label>
                    <input className={''}
                        type="text" 
                        name='image' 
                        placeholder='Image of the dog' 
                        value={input.image}
                        onChange={(e) => handleInputChange(e)}
                    />
                </div>
                <br/>
                <hr />
                <div>
                    <Link to='/home'><button className='back'> ◀ Go back</button></Link>

                    <input type="submit" value='Create' className="create"/>
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