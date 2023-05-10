import { Link } from "react-router-dom";
import '../css/NavBar.scss';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1 className="tituloNav"> Tiempo Bizkaia</h1>
            <Link className="homeLink" to="/">Home</Link>
            <Link className="aboutLink" to="/about">About</Link>
            <Link className="predictionLink" to="/prediction">Prediction</Link>
            <Link className="beachesLink" to="/beaches">Beaches</Link>
        </nav>
    )
}   

export default NavBar;