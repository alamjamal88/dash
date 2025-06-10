import { RouteObject, useRoutes } from 'react-router-dom';

// Project imports
import AuthRoutes from './authRoute';
import DefaultRoutes from './defaultRoute';
import UserRoutes from './userRoute';
import TempRoutes from './tempRoute';
import { useSelector, AppState, useDispatch } from 'src/store/Store';
import { getCsrfToken } from 'src/store/auth/AuthSlice';

// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    // Retrieve authentication state
    // const isAuthenticated = true; // Replace with real authentication logic
    const { isAuthenticated } = useSelector((state: AppState) => state.authReducer);
    // if(!isAuthenticated) localStorage.setItem("passCode",JSON.stringify("cartData"))
    // Combine routes based on authentication status
    const routsData: RouteObject[] = isAuthenticated
        ? [...UserRoutes]
        : [...AuthRoutes, ...DefaultRoutes, ...TempRoutes];

    // Render the routes
    return useRoutes(routsData);
}
