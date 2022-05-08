const { Router } = require('express');
const middleware = require('../middleware/middleware')
const { Dog, Temperament, } = require('../db');
const { default: axios } = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Base route to load database
router.get('/', async (req,res,next) =>{
    try{
        res.status(201).json({msg: 'Welcome to my Dogs Webpage'})
    }catch(err){
        next(err)
    }
});

//Route GET /dogs/{idRaza} receives and ID of a dog and looks for it in the API or DB. If the ID is an integer, it checks on the API, if the ID is longer that 16 chars, it checks on the DB.
router.get('/dogs/:idRaza', async(req,res,next) =>{
    let { idRaza } = req.params;
    if(!idRaza) return res.status(404).json({msg:'ID invalid'});

    try {
        if(idRaza.length > 16){
            const dogDB = await middleware.getDogByIdDB(idRaza);
            if(dogDB) return res.json(dogDB)
            return res.status(404).json({msg:'Such ID does not match with any dog in the DB'});
        }

        idRaza = Number.parseInt(idRaza);
        const listDogs = await middleware.getDogs();
        
        for(let dog of listDogs){
            if(dog.id === idRaza) return res.json(dog);
        }
        return res.status(404).json({msg:'Such ID does not match with any dog in the DB'}); 

    } catch (err) {
        next(err);
    }
});

// Router GET /dogs?name="...": returns a list of all dog breeds from the API or DB that contain the query parameter. IF it doesn't receive a parameter, it returns all the dogs from the API & DB
router.get('/dogs', async (req, res,next) => {
    const { name } = req.query;
    
    if(name){
        try {
            // Search on the API / Endpont allowed does not work, so I filter the dogs myself
            if(name === ' ') return res.status(404).json({msg:'Error: please insert a valid character'});
            // const dogsList = await middleware.getDogsByName(name);
            let dogsList = await middleware.getDogs();
            let dogsListfiltered = dogsList.filter( (dog) => {
                if(dog.name.includes(name?.toLowerCase().trim())) return dog;
            } );
            if(dogsList.length > 0) return res.send(dogsListfiltered)
            /////////////////////////////////////////////////////////////////////////////////
            // Search on my DB
            const dogsDB = await middleware.getDogsByNameDB(name);
            dogsDB.length > 0
            ? res.json(dogsDB)
            : res.status(404).json({msg:'Such a dog breed does not exist'});
        } catch (err) {
            next(err);
        }
    }else{
        try{
            const listDogsApi = await middleware.getDogs();
            const listDogsDB = await middleware.getDogsDB();
            const allDogs = listDogsApi.concat(listDogsDB);
            return res.status(201).json(allDogs)
        }catch(err){
            next(err);
        }
    }
    
});

// Route GET /temperament returns all temperaments. The first time it gets them from the API and stores the temperaments in the database, and from then on, it gets the temperaments from the database
router.get('/temperament', async (req,res,next) =>{
    try{
        let count = await Temperament.count();
        if(count === 0){
            const listTemperaments = await middleware.getTemperaments();
            return res.json(listTemperaments);
        }else{
            const dogsTemps = await middleware.getTemperamentsDB();
            return res.json(dogsTemps);
        }
    }catch(err){
        next(err);
    }
});

// Route POST/dog receives the data through the body and creates a new dog race in the Dog's database.
router.post('/dog', async (req,res,next) =>{

    const {name , height, weight, life_span, temperament, image} = req.body;

    // if(!name || !height || !weight) res.status(404).json({msg:'Mandatory fields incomplete'});
    if(!name) res.status(404).json({msg:'Please add a name'});
    if(typeof name !=='string') res.status(404).json({msg:'Name needs to be a string'});
    if(typeof height !=='string') res.status(404).json({msg:'height needs to be a string'});
    if(typeof weight !=='string') res.status(404).json({msg:'weight needs to be a string'});
    if(typeof life_span !=='string') res.status(404).json({msg:'life_span needs to be a string'});
    if(!Array.isArray(temperament)) res.status(404).json({msg:'temperament needs to be an array'});

    //agregar que el temperamento exista en la base datos
    try {
        // const dogsList = await middleware.getDogsByName(name);
        let dogsList = await middleware.getDogs();
        let dogsListfiltered = dogsList.filter( (dog) => {
            if(dog.name.includes(name?.toLowerCase().trim())) return dog;
        } );

        for(let dog of dogsListfiltered){
            if(dog.name === name) return res.status(404).json({msg:'There already exists this race. The name of the race has to be unique'});
        }

        const [dog, created] = await Dog.findOrCreate({
            where:{
                name: name,
                height: height ,
                weight: weight,
                life_span: life_span,
                image: image
            }
        })

        for(let temp of temperament){
            const dogsTemps = await Temperament.findOne({
                where:{
                    name: temp
                }
            });
            await dog.addTemperament(dogsTemps);
        }
        const dogByName = await middleware.getDogsByNameDB(name);
        
        created
        ? res.status(201).json(dogByName)
        : res.status(404).json({msg:'There already exists this race. The name of the race has to be unique'});
        
    } catch (err) {
        next(err);
    }
});

module.exports = router;

// COMPLETED for API & DB
// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

// COMPLETED for API & DB
// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado

// COMPLETED for API & DB
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados

// COMPLETED for API & DB
// [ ] GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

// COMPLETED for DB
// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos