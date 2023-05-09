import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>Home page content</p>
            <Link to='/about'>About</Link>
            <br />
            <Link to='/prediction'>Prediction</Link>
            <br />
            <Link to='/beaches'>Beaches</Link>
        </div>
    )
};

export default Home;