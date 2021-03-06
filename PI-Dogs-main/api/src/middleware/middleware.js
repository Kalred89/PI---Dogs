const axios = require('axios');
const { Op, Dog, Temperament } = require('../db')


module.exports = {

    // Get all dogs from the API
    getDogs: async () => {
        const dogs = await axios ('https://api.thedogapi.com/v1/breeds');
        let arrayDogs= []

        for(let dog of dogs.data){
            arrayDogs.push({
                id: dog.id,
                name: dog.name?.toLowerCase(),
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament?.toLowerCase(),
                image: dog.image.url,
            });
        }
        return arrayDogs;
    },

    getDogsDB: async () => {
            const dogsDB = await Dog.findAll({
                include: {
                    model: Temperament,
                    attributes: ["name", "id"],
                    through: { attributes: [] },
                }
            });
            return dogsDB;
    },

    getDogByIdDB: async (idDog) =>{
        const dogDB = await Dog.findOne({
            where: {
                id: idDog,
            },
            include: {
                model: Temperament,
                attributes: ["name", "id"],
                through: { attributes: [] },
            }
        });
        return dogDB;
    },

    // API endpoint does not work correctly, does not return all neccessary information, so I decided to filter the dogs myself in the route.
    // getDogsByName: async(name) => {
    //     // const dogsList = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name?.toLowerCase().trim()}`);
    //     // return dogsList.data;
    // },

    getDogsByNameDB: async(name) =>{
        const dogsDB = await Dog.findAll({ 
            where: { 
                name: { [Op.iLike]:`%${name?.toLowerCase().trim()}%`}
            },
            include: {
                model: Temperament,
                attributes: ["name", "id"],
                through: { attributes: [] },
            }
        });
        return dogsDB;
    },

    // Get all temperaments from the API
    getTemperaments: async () => {
        const dogs = await axios ('https://api.thedogapi.com/v1/breeds');
        let arrayTemperaments= [];
        let idTemperaments=[];

        for(let dog of dogs.data){
            let tempArray = dog.temperament?.toLowerCase().split(',');
            if(tempArray?.length > 0){
                for(let temp of tempArray) {
                    if(!arrayTemperaments.includes(temp.trim())){
                        arrayTemperaments.push(temp.trim()); 
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
        await Temperament.bulkCreate(idTemperaments);
        return idTemperaments;
    },

    getTemperamentsDB: async () =>{
        const dogsTemps = await Temperament.findAll();
        return dogsTemps;
    }
}
