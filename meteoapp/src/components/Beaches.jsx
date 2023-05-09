import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Beaches = () => {
    let { id } = useParams();
    if (id === undefined) {
        id = 4804801;
    }
    const [predictions, setPredictions] = useState([]);
    const [name, setName] = useState('');
    
    const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb256aXBpMTk5OUBob3RtYWlsLmNvbSIsImp0aSI6IjFjYzE0YjQwLTU1ZGUtNDU4ZS1hNDdiLTdjYjlmNjBjZWJkYyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjgzNTM1ODEyLCJ1c2VySWQiOiIxY2MxNGI0MC01NWRlLTQ1OGUtYTQ3Yi03Y2I5ZjYwY2ViZGMiLCJyb2xlIjoiIn0.eXFFHrGyStu0gvXOgE5Oa-9WwfPQR6YFdWvZ09uEqNM'
    useEffect(() => {
        fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/playa/${id}?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            fetch(data.datos)
            .then(response => response.json())
            .then(data => getPredictions(data))
        })
        .catch(error => console.log(error))

    },[id])

    const getPredictions = (data) => {
        console.log(data);
        const newPredictions = data[0].prediccion.dia;
        setPredictions(newPredictions);
        setName(data[0].nombre);
    }

    return(
        <div className='beaches'>
            <Link to='/'>Home</Link>
            <h1>Prediction for {name} beach</h1>
            {predictions.map((prediction,index) => (
                <article className='beaches__day' key={index}>
                        <h2>Fecha:{prediction.fecha}</h2>
                        <p>Temperatura:
                            <span> Maxima: {prediction.tMaxima.valor1}</span>
                        </p>
                        <p>temperatura del agua: {prediction.tAgua.valor1}</p>
                        <p>Sensacion termica: {prediction.sTermica.descripcion1}</p>

                        <p>estado del cielo: 
                            <span> Mañana: {prediction.estadoCielo.descripcion1}</span>
                            <span> Tarde: {prediction.estadoCielo.descripcion2}</span>
                        </p>
                        <p>estado del viento: 
                            <br />
                            <span> Mañana: {prediction.viento.descripcion1}</span>
                            <br />
                            <span> Tarde: {prediction.viento.descripcion2}</span>
                        </p>
                        <p>Oleaje: 
                            <br />
                            <span> Mañana: {prediction.oleaje.descripcion1}</span>
                            <br />
                            <span> Tarde: {prediction.oleaje.descripcion2}</span>
                        </p>
                        


                    </article>
            ))}
        </div>
    )


}

export default Beaches;