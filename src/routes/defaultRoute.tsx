// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import React, { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { RouteObject } from 'react-router-dom';

const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

// front end pages
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));
const About = Loadable(lazy(() => import('../views/pages/frontend-pages/About')));
const Contact = Loadable(lazy(() => import('../views/pages/frontend-pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/pages/frontend-pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/pages/frontend-pages/Pricing')));
const BlogPage = Loadable(lazy(() => import('../views/pages/frontend-pages/Blog')));
const BlogPost = Loadable(lazy(() => import('../views/pages/frontend-pages/BlogPost')));
const MainPage = Loadable(lazy(() => import('src/application/homepage/')));

const DefaultRoutes: RouteObject[] = [
    {
        path: '/',
        element: <BlankLayout />,
        children: [
            { path: '', element: <MainPage /> },
            { path: 'homepage', element: <Homepage /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact /> },
            { path: 'portfolio', element: <Portfolio /> },
            { path: 'pricing', element: <PagePricing /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'blog/detail/:id', element: <BlogPost /> },
            { path: '404', element: <Error /> }, // Error page
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

// const defaultRoute = createBrowserRouter(DefaultRoutes);

export default DefaultRoutes;
