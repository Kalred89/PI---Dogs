import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    dogs: [],
    dogDetails: [],
    temperaments: [],
}

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {

        setDogsList: (state, action) => {
            state.dogs = action.payload;
        },

        setTemperamentsList:(state, action) => {
            state.temperaments = action.payload;
        },
        
        setDogDetails: (state, action) => {
            state.dogDetails = action.payload;
        },

        createDog:(state, action) => {
            
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { setDogsList, setTemperamentsList, setDogDetails } = dogsSlice.actions

export default dogsSlice.reducer

export const getAllDogs = () => {
    return (dispatch) =>{
        axios
            .get('http://localhost:3001/dogs')
            .then(response => {
                dispatch(setDogsList(response.data));
            })
            .catch(error => console.log(error))
    }
}

export const getAllTemperaments = () => {
    return (dispatch) =>{
        axios
            .get('http://localhost:3001/temperament')
            .then(response => {
                dispatch(setTemperamentsList(response.data));
            })
            .catch(error => console.log(error))
    }
}


export const getDogDetails = (id) => {
    return (dispatch) =>{
        axios
            .get(`http://localhost:3001/dogs/${id}`)
            .then(response => {
                dispatch(setDogDetails(response.data));
            })
            .catch(error => console.log(error))
    }
}

export const filteredDogsTemperaments = (dogs) =>{
    let arrayTemperaments= [];
    let idTemperaments=[];

    for(let dog of dogs){
        let tempArray = dog.temperament?.split(',');
        if(tempArray?.length > 0){
            for(let temp of tempArray) {
                if(!arrayTemperaments.includes(temp)){
                    arrayTemperaments.push(temp); 
                }    
            }
        }
    }
    arrayTemperaments.sort((a, b) => a.localeCompare(b))

    for(let i =0; i < arrayTemperaments.length; i++){
        idTemperaments.push({
            id: i+1,
            name: arrayTemperaments[i]
        });
    }
    return idTemperaments;
}
