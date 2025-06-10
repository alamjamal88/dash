import React, { lazy } from 'react';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const EcommerceDash = Loadable(lazy(() => import('../views/dashboard/Ecommerce')));

const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));

const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));
const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));

const UserRoutes: RouteObject[] = [
    {
        path: '/',
        element: <FullLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboards/modern" /> },
            { path: '/dashboards/modern', element: <ModernDash /> },
            { path: '/dashboards/ecommerce', element: <EcommerceDash /> },
            { path: '/apps/invoice/list', element: <InvoiceList /> },
            { path: '/apps/invoice/create', element: <InvoiceCreate /> },
            { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
            { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    },
    {
        path: '/404',
        element: <BlankLayout />,
        children: [
            { path: '', element: <Error /> },
            { path: '*', element: <Navigate to="/404" /> }
        ]
    }
];

// const defaultRoute = createBrowserRouter(DefaultRoutes);

export default UserRoutes;
