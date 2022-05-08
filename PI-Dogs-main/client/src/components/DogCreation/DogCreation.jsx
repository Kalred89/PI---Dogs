import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postNewDog, getAllTemperaments, getAllDogs } from "../../Slice/docSlice";

export function validate (input, dogs){
    let errors = {};

    if(!input.name || input.name === ''){
        errors.name = 'Name is required'
    }else if(dogs?.filter(dog => dog.name === input.name).length){
        errors.name = 'There already exists this dog breed. The dog breed has to be unique'
    }

    if(!input.heightMin || !input.heightMax){
        errors.height = 'Min & Max are both required'
    }else if(!typeof input.heightMin === 'number' || !typeof input.heightMax === 'number'){
        errors.height = 'Min & Max both have to be numbers'
    }else if(input.heightMin < 1 || input.heightMax < 1){
        errors.height = 'Min & Max both have to be greater than 0'
    }

    if(!input.weightMin || !input.weightMax){
        errors.weight = 'Min & Max are both required'
    }else if(!typeof input.weightMin === 'number' || !typeof input.weightMax === 'number'){
        errors.weight = 'Min & Max have to be numbers'
    }else if(input.weightMin <= 0 || input.weightMax <= 0){
        errors.weight = 'Min & Max both have to be greater than 0'
    }

    if(!input.life_span){
        errors.life_span = 'Life expectancy is required'
    }else if(!typeof input.life_span === 'number'){
        errors.life_span = 'Life expectancy has to be a number'
    }else if(input.life_span <= 0){
        errors.life_span = 'Life expectancy has to be greater than 0'
    }

    if(input.temperament.length === 0){
        errors.temperament = 'At least one temperament is required'
    }
    return errors;
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
    const [buttonState, setButtonState] = useState({
        disable: true
    });

    useEffect(()=>{
        dispatch(getAllTemperaments())
        dispatch(getAllDogs());
    },[dispatch])

    function handleSubmit (e){
        e.preventDefault();
        input.height = `${input.heightMin} - ${input.heightMax}` ;
        input.weight = `${input.weightMin} - ${input.weightMax}` ;
        if(!Object.keys(errors).length && input.name !== ""){
            console.log("input:", input);
            console.log("errors:", errors);
            // dispatch(postNewDog(input));
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
            // history.push('/home');
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
    }

    function handleDelete(temp) {
        setInput({
            ...input, temperament: [input.temperament.filter(t => t !== temp)]
        });
    }
    // console.log(input);
    // console.log(dogs.length);
    return (
        <div>
            <Link to='/home'><button>Go back</button></Link>
            <h1>Complete the form below to create your own new dog breed!</h1>
            <label>Fields with * are obligatory.</label>
            <form onSubmit={(e) => handleSubmit(e)}>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Dog Breed*: </label>
                    <input className={''}
                        type="text" 
                        name='name' 
                        placeholder='Enter a name for your new dog...' 
                        value={input.name}
                        onChange={(e) => handleInputChange(e)}
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Height - Min & Max* </label>
                    <input className={''}
                        type="number" 
                        name='heightMin' 
                        placeholder='Enter MINIMUM height in cm...' 
                        value={input.heightMin}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={''}
                        type="number" 
                        name='heightMax' 
                        placeholder='Enter MAXIMUM height in cm...' 
                        value={input.heightMax}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> Cm</label>
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Weight - Min & Max* </label>
                    <input className={''}
                        type="number" 
                        name='weightMin' 
                        placeholder='Enter MINIMUM weight in cm...' 
                        value={input.weightMin}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> - </label>
                    <input className={''}
                        type="number" 
                        name='weightMax' 
                        placeholder='Enter MAXIMUM weight in cm...' 
                        value={input.weightMax}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> kg</label>
                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Life expectency*: </label>
                    <input className={''}
                        type="number" 
                        name='life_span' 
                        placeholder='Enter life expectency in years...' 
                        value={input.life_span}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label> Years</label>
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Select temperaments*: </label>
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
                                    <button onClick={() => handleDelete(temp)}>X</button>
                                </div>)
                            }</li>
                        </ul>
                    </div>
                    {errors.temperament && (
                        <p>{errors.temperament}</p>
                    )}
                    
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