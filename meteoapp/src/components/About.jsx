import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <p>About page content</p>
            <Link to='/'>Home</Link>
            <br />
            <Link to='/prediction'>Prediction</Link>
        </div>
    );
}

export default About;