import {useState,useEffect} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import codes from '../data/bizkaia.json';

const Prediction = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const [predictions, setPredictions] = useState([]);
    const [location, setLocation] = useState('');
    const [locationCode, setLocationCode] = useState(null);   

    const api_key = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqb256aXBpMTk5OUBob3RtYWlsLmNvbSIsImp0aSI6IjFjYzE0YjQwLTU1ZGUtNDU4ZS1hNDdiLTdjYjlmNjBjZWJkYyIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNjgzNTM1ODEyLCJ1c2VySWQiOiIxY2MxNGI0MC01NWRlLTQ1OGUtYTQ3Yi03Y2I5ZjYwY2ViZGMiLCJyb2xlIjoiIn0.eXFFHrGyStu0gvXOgE5Oa-9WwfPQR6YFdWvZ09uEqNM'

    useEffect(() => {
        if (id !== undefined) {
            setLocationCode(id);
            const name = codes.find(code => getCode(code.CPRO,code.CMUN) === id).NOMBRE;
        setLocation(name);
        }
    },[id])

    useEffect(() => {
        if (!locationCode) return;
            fetch(`https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/horaria/${locationCode}?api_key=${api_key}`)
            .then(response => response.json())
            .then(data =>{
                fetch(data.datos)
                .then(response => response.json())
                .then(data => getPredictions(data))
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    },[locationCode])
    const getPredictions = (data) => {
        console.log(data);
        const newPredictions = data[0].prediccion.dia;
        setPredictions(newPredictions);
        console.log(newPredictions);
    }

    const getHourPrediction = (prediction) => {
        let result = [];
        for (let i = 0; i < 24; i++) {
            const estadoCielo = prediction.estadoCielo.find(element => parseInt(element.periodo) === i);
            const temperatura = prediction.temperatura.find(element => parseInt(element.periodo) === i);
            const hourPrediction = {
                hora: i,
                estadoCielo: estadoCielo ? estadoCielo.descripcion: 'No hay datos',
                temperatura: temperatura ? temperatura.value: 'No hay datos'
            }
            if(estadoCielo || temperatura){
            result.push(hourPrediction)};
        }
        return result;
    }

    const getCode = (CPRO,CMUN) => {
        let result = CMUN.toString();
        while(result.length < 3){
            result = '0' + result;
        }
        result = CPRO.toString() + result;
        return result; 
    }

    const goTo = (location) => {
        navigate(`/prediction/${location}`);
    } 

    return(
        <div className='prediction'>
            <Link to='/'>Home</Link>
            <h1>Prediction for {location}</h1>
            <select name="location" id="location" onChange={(e)=>goTo(e.target.value)} value={locationCode ? locationCode:''}>
                {!locationCode && <option value=''>Selecciona un municipio</option>}
                {codes.map((code,index) => (
                    <option key={index} value={getCode(code.CPRO,code.CMUN)}>{code.NOMBRE}</option>
                ))}
            </select>
            {predictions.map((prediction,index) => (
                <article className='prediction__day' key={index}>
                        <h2>Fecha:{prediction.fecha.split('T')[0]}</h2>
                        <h2>Orto:{prediction.orto}</h2>
                        <h2>Ocaso:{prediction.ocaso}</h2>
                        <ul>
                            {getHourPrediction(prediction).map((hourPrediction) => (
                                <li key={hourPrediction.hora}>
                                    <h3>Hora:{hourPrediction.hora}</h3>
                                    <h3>Estado del cielo:{hourPrediction.estadoCielo}</h3>
                                    <h3>Temperatura:{hourPrediction.temperatura}</h3>
                                </li>
                            ))}
                        </ul>
                </article>
            ))}

        </div>
    );
}

export default Prediction;
