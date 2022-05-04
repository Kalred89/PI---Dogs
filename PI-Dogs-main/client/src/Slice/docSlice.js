import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    dogs: [],
    temperaments: [],
    filteredDogs: [],
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

        setDogsByFilter: (state, action) => {
            state.filteredDogs = action.payload;
        },
        
        createDog:(state, action) => {
            
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { setDogsList, setTemperamentsList, setDogsByFilter } = dogsSlice.actions

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

export const getDogsByName = (name) => {

    return (dispatch) =>{
        axios
            .get(`http://localhost:3001/dogs?name=${name}`)
            .then(response => {
                dispatch(setDogsByFilter(response.data));
            })
            .catch(error => console.log(error))
    }
}

export const getDogsById = (id) => {

    return (dispatch) =>{
        axios
            .get(`http://localhost:3001/dogs/${id}`)
            .then(response => {
                dispatch(setDogsByFilter(response.data));
            })
            .catch(error => console.log(error))
    }
}