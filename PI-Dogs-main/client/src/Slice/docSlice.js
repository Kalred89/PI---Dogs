import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dogs: [],
    temperaments: [],
}

export const dogsSlice = createSlice({
    name: 'dogs',
    initialState,
    reducers: {

        loadDogs: (state, action) => {
            state.dogs = action.payload;
        },
        
        getDogsByName: (state, action) => {
        // return async function (dispatch){
        //     return await axios.get(`http://localhost:3001/dogs?name=${name}`)
        //         .then(res => dispatch({type: GET_DOGS_BY_NAME, payload: res.data}))
        // }
        },
        
        getDogsById:(state, action) => {
        // return async function (dispatch){
        //     return await axios.get(`http://localhost:3001/dogs/${id}`)
        //         .then(res => dispatch({type: GET_DOGS_BY_ID, payload: res.data}))
        // }
        },
        
        loadTemperaments:(state, action) => {
            state.temperaments = action.payload;
        },
        
        createDog:(state, action) => {
            
        }
        
    },
})

// Action creators are generated for each case reducer function
export const { loadDogs, loadTemperaments } = dogsSlice.actions

export default dogsSlice.reducer