import React from 'react';
// import Style from '../DogCards/dogcards.module.css';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllDogs, getAllTemperaments, filteredDogsTemperaments } from '../../Slice/docSlice';
import Pagination from '../Pagination/Pagination';
import DogCard from '../DogCard/DogCard';
import { Link } from 'react-router-dom';
import './dogcards.css'

export default function DogCards() {
    // Initial states and local states for filters
    const { dogs, temperaments } = useSelector((state) => state.dogsSlice);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const inputRef= useRef();
    const selectRef= useRef();
    const selectDogRef= useRef();
    const selectSort = useRef();
    const dispatch = useDispatch();
    const showDogs = filteredDogs.length ? filteredDogs : dogs
    const showTemps = !filteredDogs.length ? temperaments : filteredDogsTemperaments(filteredDogs);
    // Local states for pagination 
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = showDogs.slice(indexOfFirstDog,indexOfLastDog);
    // Sets the initial states
    useEffect(()=>{
        dispatch(getAllDogs());
        dispatch(getAllTemperaments())
    },[dispatch,])

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    // Handles de input search of dogs by name
    function handleSubmit(e){
        let filtered = dogs.filter( (dog) => dog.name.includes(e.target.value?.toLowerCase().trim()));
        setFilteredDogs(filtered);
        selectRef.current.value = "noTemp";  
    }
    // Handles de select search of temperaments 
    function handleTemperament(e){
        if (!filteredDogs.length){
            let filtered = dogs.filter( (dog) => dog.temperament?.includes(e.target.value))
            setFilteredDogs(filtered);    
        } else {
            setFilteredDogs(prev=> prev.filter ( (dog) => dog.temperament?.includes(e.target.value)))
        }
    }
    // Handles the sorting options
    function HandleSortBy(sorting){
        switch(sorting){
            case 'NameAZ':
                if (!filteredDogs.length){
                    setFilteredDogs(dogs?.slice().sort((dogA, dogB) => {
                        if (dogA.name < dogB.name) return -1;
                        if (dogA.name > dogB.name) return 1;
                        return 0; 
                    })); 
                }else{
                    setFilteredDogs(prev=> prev?.slice().sort((dogA, dogB) => {
                        if (dogA.name < dogB.name) return -1;
                        if (dogA.name > dogB.name) return 1;
                        return 0; 
                    }));
                } 
                break;
            case 'NameZA':
                if (!filteredDogs.length){
                    setFilteredDogs(dogs?.slice().sort((dogA, dogB) => {
                        if (dogA.name > dogB.name) return -1;
                        if (dogA.name < dogB.name) return 1;
                        return 0; 
                    })); 
                }else{
                    setFilteredDogs(prev=> prev?.slice().sort((dogA, dogB) => {
                        if (dogA.name > dogB.name) return -1;
                        if (dogA.name < dogB.name) return 1;
                        return 0; 
                    }));
                } 
                break;
            case 'WeightLH':
                if (!filteredDogs.length){
                    setFilteredDogs(dogs?.slice().sort((dogA, dogB) => {
                        if (dogA.weight < dogB.weight) return -1;
                        if (dogA.weight > dogB.weight) return 1;
                        return 0; 
                    })); 
                }else{
                    setFilteredDogs(prev=> prev?.slice().sort((dogA, dogB) => {
                        if (dogA.weight < dogB.weight) return -1;
                        if (dogA.weight > dogB.weight) return 1;
                        return 0; 
                    }));
                } 
                break;
            case 'WeightHL':
                if (!filteredDogs.length){
                    setFilteredDogs(dogs?.slice().sort((dogA, dogB) => {
                        if (dogA.weight > dogB.weight) return -1;
                        if (dogA.weight < dogB.weight) return 1;
                        return 0; 
                    })); 
                }else{
                    setFilteredDogs(prev=> prev?.slice().sort((dogA, dogB) => {
                        if (dogA.weight > dogB.weight) return -1;
                        if (dogA.weight < dogB.weight) return 1;
                        return 0; 
                    }));
                } 
                break;
            default: console.log("Please, select a sorting method");
        }

    }
    // Clears all the filters
    function handleClear(){
        setFilteredDogs([]);
        inputRef.current.value = "";
        selectRef.current.value = "noTemp";
        selectDogRef.current.value= "noBreed";
        selectSort.current.value='NoSort';      
    }

    return (
        <div>
            <label>Filter by name: </label>
            <input type="text" placeholder='Buscar perros...' onChange={e => handleSubmit(e)} ref={inputRef}></input>

            <label>Filter by temperament: </label>
            <select name="Temperaments" id="Temperaments" onChange={e => handleTemperament(e)} ref={selectRef}>
                <option key={0} value="noTemp">Select a temperament...</option>
                {
                    showTemps.map(temp =>
                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                    )
                
                }
            </select>

            <label>Filter by breed: </label>
            <select name="Breeds" id="Breeds" onChange={e => handleSubmit(e)} ref={selectDogRef}>
                <option key={0} value="noBreed">Select a breed...</option>
                {
                    showDogs?.map(dog =>
                        <option key={dog.id} value={dog.name}>{dog.name}</option>
                    )
                }
            </select>

            <label>Sort by: </label>
            <select name="Sort" id="Sort" onChange={(e) => {
                HandleSortBy(e.target.value);
            }} ref={selectSort}>
                <option key={0} value='NoSort'>Select an sorting...</option>
                <option key={1} value='NameAZ'>Name: A to Z</option>
                <option key={2} value='NameZA'>Name: Z to A</option>
                <option key={3} value='WeightLH'>Weight: Low to High</option>
                <option key={4} value='WeightHL'>Weight: High to Low</option>
            </select>

            <button onClick={handleClear}>Clear all filters</button> 
            
            <Pagination dogsPerPage = {dogsPerPage} showDogs = {showDogs.length} pagination = {pagination}/>
            {currentDogs.map(dog => (
                <Link key={dog.id} to={`/dogs/${dog.id}`}>
                    <DogCard key={dog.id} id={dog.id} name={dog.name} image={dog.image} weight={dog.weight} temperament={dog.temperament}/>
                </Link>
                ))
            }
            <Pagination dogsPerPage = {dogsPerPage} showDogs = {showDogs.length} pagination = {pagination}/>
        </div>
    )
}
