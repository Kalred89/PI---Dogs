const { Router } = require('express');
const middleware = require('../middleware/middleware')
const { Op , Dog, Temperament, } = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Base route to load database
router.get('/', async (req,res,next) =>{
    try{
        const listDogs = await middleware.getDogs();
        let count1 = await Dog.count();
        if(count1 === 0) await Dog.bulkCreate(listDogs);
        const listTemperaments = await middleware.getTemperaments();
        let count2 = await Temperament.count();
        if(count2 === 0) await Temperament.bulkCreate(listTemperaments);

        return res.status(201).json({msg: 'The database loaded successfully'})
    }catch(err){
        next(err)
    }
});

// Router /dogs?name="...": returns a list of all dog breeds that contain the query parameter
router.get('/dogs', async (req, res,next) => {

    try {
        const { name } = req.query;
        console.log(name);
        
        const dogsDB = await Dog.findAll({ 
            where: { 
                name: { [Op.like]:`%${name}%`}
            } 
        });

        dogsDB.length > 0
        ? res.json(dogsDB)
        : res.status(404).json({msg:'Such a dog breed does not exist'});
    } catch (err) {
        next(err);
    }
});

// Route /dogs returns all the dogs from the database
router.get('/dogs', async (req,res,next) =>{
    try{
        const dogsDB = await Dog.findAll();
        // console.log(dogsDB.length);
        return res.json(dogsDB);
    }catch(err){
        next(err);
    }
});




// Route /temperament returns all temperaments from the database
router.get('/temperament', async (req,res,next) =>{
    try{

    }catch(err){
        next(err);
    }
});

module.exports = router;


// [ ] GET /dogs:
// Obtener un listado de las razas de perro
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /dogs?name="...":
// Obtener un listado de las razas de perro que contengan la palabra ingresada como query parameter
// Si no existe ninguna raza de perro mostrar un mensaje adecuado
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// [ ] GET /temperament:
// Obtener todos los temperamentos posibles
// En una primera instancia deberán obtenerlos desde la API externa y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
// [ ] POST /dog:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de raza de perro por body
// Crea una raza de perro en la base de datos