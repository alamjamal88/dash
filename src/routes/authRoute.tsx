import React, { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';

import Loadable from '../layouts/full/shared/loadable/Loadable';

const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication
const FirstStep = Loadable(lazy(() => import('../application/auth/FirstStep')));
const TwoSteps = Loadable(lazy(() => import('../application/auth/TwoSteps')));

const AuthRoutes: RouteObject[] = [
    {
        path: '/auth',
        element: <BlankLayout />,
        children: [
            { path: 'login', element: <FirstStep /> },

            { path: 'two-steps', element: <TwoSteps /> },

            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

// const authRouter = createBrowserRouter(AuthRoutes);

export default AuthRoutes;
