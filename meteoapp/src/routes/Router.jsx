import { createBrowserRouter} from 'react-router-dom';

import Home from '../components/Home';
import About from '../components/About';
import Prediction from '../components/Prediction';
import Beaches from '../components/Beaches';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>404 Not Found</div>,
        children:[
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/prediction',
                element: <Prediction />,
                children:[
                    {
                        path: ':id',
                        element: <Prediction />
                    }
                ]
            },
            {
                path: '/beaches',
                element: <Beaches />,
                children:[
                    {
                        path: ':id',
                        element: <Beaches />
                    }
                ]
            }
        ]
    }
    
]);


export default Router;
