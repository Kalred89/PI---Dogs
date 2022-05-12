import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    dogs: [],
    temperaments: [],
}
// sets the states
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
    },
})

// Action creators are generated for each case reducer function
export const { setDogsList, setTemperamentsList } = dogsSlice.actions

export default dogsSlice.reducer

// gets all dogs from the back.
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

// gets all temperaments from the back.
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

// gets all the temperaments and orders them.
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


