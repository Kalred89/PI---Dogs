import React from "react";
import { Link } from "react-router-dom";


export default function dogCreation (){



    return (
        <div>
            <Link to='/home'>
                <button>Go back</button>
            </Link>
            <h1>Complete the form below to create your own new dog breed!</h1>
            <form onSubmit=''>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Breed: </label>
                    <input className={''}
                        type="text" 
                        name='name' 
                        placeholder='Enter a name for your new dog...' 
                        value={''}
                        onChange={''}
                    />
                </div>
                <br/>
                <hr />
                <br />
                {/* <div>
                    <label>Height - Min & Max </label>
                    <input className={''}
                        type="text" 
                        name='height-min' 
                        placeholder='Enter MINIMUM height in cm...' 
                        value={''}
                        onChange={''}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='height-max' 
                        placeholder='Enter MAXIMUM height in cm...' 
                        value={''}
                        onChange={''}
                    />
                    <label> Cm</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Weight - Min & Max </label>
                    <input className={''}
                        type="text" 
                        name='weight-min' 
                        placeholder='Enter MINIMUM weight in cm...' 
                        value={''}
                        onChange={''}
                    />
                    <label> - </label>
                    <input className={''}
                        type="text" 
                        name='weight-max' 
                        placeholder='Enter MAXIMUM weight in cm...' 
                        value={''}
                        onChange={''}
                    />
                    <label> kg</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Life expectency: </label>
                    <input className={''}
                        type="text" 
                        name='life_span' 
                        placeholder='Enter life expectency in years...' 
                        value={''}
                        onChange={''}
                    />
                    <label> Years</label>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Select temperaments: </label>
                    <select>
                        <option key={0} value="noTemp">Select a temperament...</option>
                    </select>
                </div>
                <br/>
                <hr />
                <br />
                <div>
                    <label>Image: </label>
                    <input className={''}
                        type="file" 
                        name='image' 
                        placeholder='Add an image to your new dog' 
                        value={''}
                        onChange={''}
                    />
                </div>
                <br/>
                <hr />
                <br /> */}
                <div>
                    <input type="submit" value='Submit'/>
                </div>
            </form>
        </div>
    )

}

// Ruta de creación de raza de perro: debe contener

// [ ] Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Altura (Diferenciar entre altura mínima y máxima)
// Peso (Diferenciar entre peso mínimo y máximo)
// Años de vida
// [ ] Posibilidad de seleccionar/agregar uno o más temperamentos
// [ ] Botón/Opción para crear una nueva raza de perro