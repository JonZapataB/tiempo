import {useState,useEffect} from 'react';

const Prediction = () => {
    const [predictions, setPredictions] = useState([]);
    const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb256aXBpMTk5OUBob3RtYWlsLmNvbSIsImp0aSI6IjFjYzE0YjQwLTU1ZGUtNDU4ZS1hNDdiLTdjYjlmNjBjZWJkYyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjgzNTM1ODEyLCJ1c2VySWQiOiIxY2MxNGI0MC01NWRlLTQ1OGUtYTQ3Yi03Y2I5ZjYwY2ViZGMiLCJyb2xlIjoiIn0.eXFFHrGyStu0gvXOgE5Oa-9WwfPQR6YFdWvZ09uEqNM'
    useEffect(() => {
            fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/48020?api_key=${api_key}`)
            .then(response => response.json())
            .then(data =>{
                console.log(data)
                fetch(data.datos)
                .then(response => response.json())
                .then(data => getPredictions(data))
            })
            .catch(error => console.log(error))
        },[])
        const getPredictions = (data) => {
            const newPredictions = data[0].prediccion.dia
            setPredictions(newPredictions)
            console.log(newPredictions)
        }



    return(
        <div className='prediction'>
            <h1>Prediction</h1>
            {predictions.map((prediction,index) => (
                <article className='prediction__day' key={index}>
                        <h2>Fecha:{prediction.fecha}</h2>
                        <h2>Orto:{prediction.orto}</h2>
                        <h2>Ocaso:{prediction.ocaso}</h2>
                        {/* <div className='prediction__day__info__morning'>
                            <h3>Mañana</h3>
                            <p>{prediction.estadoCielo[0].descripcion}</p>
                            <p>Temperatura máxima: {prediction.temperatura.maxima}ºC</p>
                            <p>Temperatura mínima: {prediction.temperatura.minima}ºC</p>
                            <p>Probabilidad de precipitación: {prediction.probPrecipitacion[0].value}%</p>
                            <p>Viento: {prediction.viento[0].velocidad}km/h</p>
                        </div> */}
                </article>
            ))}

        </div>
    );
}

export default Prediction;
