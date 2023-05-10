import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Home = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    )
};

export default Home;