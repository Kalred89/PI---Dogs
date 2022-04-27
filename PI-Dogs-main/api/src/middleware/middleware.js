const axios = require('axios');
const { Dog, Temperament } = require('../db')


module.exports = {

    // Get all dogs from the API
    getDogs: async () => {
        const dogs = await axios ('https://api.thedogapi.com/v1/breeds');
        let arrayDogs= []

        for(let dog of dogs.data){
            arrayDogs.push({
                id_dog: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
            });
        }
        return arrayDogs;
    },

    // Get all temperaments from the API
    getTemperaments: async () => {
        const dogs = await axios ('https://api.thedogapi.com/v1/breeds');
        let arrayTemperaments= [];
        let idTemperaments=[];

        for(let dog of dogs.data){
            // console.log(dog.temperament?.split(','));
            let tempArray = dog.temperament?.split(',');
            if(tempArray?.length > 0){
                for(let temp of tempArray) {
                    if(!arrayTemperaments.includes(temp.trim())){
                        arrayTemperaments.push(temp.trim()); 
                    }    
                }
            }
        }

        for(let i =0; i < arrayTemperaments.length; i++){
            idTemperaments.push({
                id: i+1,
                name: arrayTemperaments[i]
            });
        }
        // console.log(arrayTemperaments);
        // console.log(idTemperaments);
        return idTemperaments;
    },

}
