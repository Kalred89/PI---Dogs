import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadDogs, loadTemperaments } from '../Slice/docSlice';
import axios from 'axios'

export default function Home (){
    const { dogs, temperament } = useSelector((state) => state.dogsSlice);
    const [filteredDogs, setFilteredDogs] = useState([])
    const [filter, setFilter] = useState("")
    const dispatch = useDispatch();

    useEffect(()=>{
        async function loadAllDogs() {
            const dogsApiDB = await axios.get('http://localhost:3001/dogs')
            dispatch(loadDogs(dogsApiDB.data))
        }
        loadAllDogs();

        async function loadAllTemperaments() {
            const temperamentsDB = await axios.get('http://localhost:3001/temperament')
            dispatch(loadTemperaments(temperamentsDB.data))
        }
        loadAllTemperaments();

    },[dispatch])

    // useEffect(()=>{
    //     (async function () {
    //     const fil = await axios.get(`http://localhost:3001/dogs?name=${filter}`)
    //     setFilteredDogs(fil)})()
    // }, [filter])

    // console.log("soy el filter",filteredDogs);

    async function handleSubmit(){
        const data = await axios.get(`http://localhost:3001/dogs?name=${filter}`)
        setFilteredDogs(data.data)
    }
 
    return (
        <div>
            
            <input type="text" onChange={(e)=>setFilter(e.target.value)}></input>
            <input type="submit" onClick={handleSubmit} />
            {!filteredDogs.length && dogs.map(dog => (
                <div key={dog.id}>
                    <p>{dog.id}</p>
                    <p>{dog.name}</p>
                    <p>{dog.height}</p>
                    <p>{dog.weight}</p>
                    <p>{dog.temperament}</p>
                </div>     
            ))}
            {filteredDogs && filteredDogs.map(dog => (
                <div key={dog.id}>
                    <p>{dog.id}</p>
                    <p>{dog.name}</p>
                    <p>{dog.height[1]}</p>
                    <p>{dog.weight[1]}</p>
                    <p>{dog.temperament}</p>
                </div>     
            ))}
        </div>
    )
}

