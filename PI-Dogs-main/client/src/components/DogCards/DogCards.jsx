import React from 'react';
// import Style from '../DogCards/dogcards.module.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDogs, getAllTemperaments, getDogsByName, getDogsById } from '../../Slice/docSlice';
import axios from 'axios';
import './dogcards.css'

export default function DogCards() {
    const { dogs, temperaments,  } = useSelector((state) => state.dogsSlice);
    const [filteredDogs, setFilteredDogs] = useState([])
    const [filteredTemps, setFilteredTemps] = useState([])
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllDogs());
        dispatch(getAllTemperaments())
    },[dispatch])

    async function handleSubmit(e){
        e.preventDefault()
        // const data = await axios.get(`http://localhost:3001/dogs?name=${filter}`)
        const data = getDogsByName(filter)
        setFilteredDogs(data.data)
    }

    // function sortBy(sorting){
    //     console.log(sorting);
    //     switch(sorting){

    //         case 'NameAZ':
    //             dogs.sort((dogA, dogB) => dogA.name.localeCompare(dogB.name))
    //             break;
    //         case 'NameZA':
    //             dogs.sort((dogA, dogB) => dogB.name.localeCompare(dogB.name))
    //             break;
    //         case 'WeightLH':
    //             dogs.sort((dogA, dogB) => dogA.weight.localeCompare(dogB.weight))
    //             break;
    //         case 'WeightHL':
    //             dogs.sort((dogA, dogB) => dogB.weight.localeCompare(dogA.weight))
    //             break;

    //         default: console.log("Sort by: not a valid sorting method");
    //     }

    // }
    return (
        <div>
            <input type="text" placeholder='Buscar perros...' onChange={(e)=>setFilter(e.target.value)}></input>
            <button onClick={e => handleSubmit(e)}>Buscar</button>

            <label>Filter by temperament: </label>
            <select name="Temperaments" id="Temperaments" onChange={(e) => {
                const temp = e.target.value;
                setFilteredTemps(temp);
            }}>
                <option defaultValue='Select a temperament'>Select a temperament...</option>
                {
                    temperaments?.map(temp =>
                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                    )
                }
            </select>

            <label>Filter by breed: </label>
            <select name="Breeds" id="Breeds" onChange={(e) => {
                const breed = e.target.value;
                setFilter(breed);
                // CHECK THIS!!
                handleSubmit()
            }}>
                <option defaultValue='Select a breed'>Select a breed...</option>
                {
                    dogs?.map(dog =>
                        <option key={dog.id} value={dog.name}>{dog.name}</option>
                    )
                }
            </select>
            

            {/* <label>Sort by: </label>
            <select name="Sort" id="Sort" onChange={(e) => {
                sortBy(e?.target?.value);
            }}>
                <option defaultValue='Select a temperament'>Select an order...</option>
                <option value='NameAZ'>Name: A to Z</option>
                <option value='NameZA'>Name: Z to A</option>
                <option value='WeightLH'>Weight: Low to High</option>
                <option value='WeightHL'>Weight: High to Low</option>
            </select> */}
            

            {!filteredDogs.length && dogs?.filter((dog) =>{
                    if(!filteredTemps) return dog
                    else if(dog.temperament?.includes(filteredTemps)) return dog;
                })
                .map(dog => (
                    <div key={dog.id} className='Card'>
                        <img src={dog.image} alt={dog.name} className='Image'/>
                        <p>Name: {dog.name}</p>
                        <p>Weight: {dog.weight} kg.</p>
                        <p>Temperament: {dog.temperament}</p>
                    </div>     
            ))}

            {filteredDogs && filteredDogs.map(dog => (
                <div key={dog.id} className='Card'>
                    <img src={dog.image} alt={dog.name} />
                    <p>Name: {dog.name}</p>
                    <p>Weight: {dog.weight} kg.</p>
                    <p>Temperament: {dog.temperament}</p>
                    
                </div>     
            ))}

        </div>
    )
}

