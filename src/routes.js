import { Navigate, useRoutes } from 'react-router-dom';
import Main from './pages/Main';
import Add from './pages/Add';
import Edit from './pages/Edit';

export default function Router(){
    return useRoutes([
        {
            path: '/',
            element: <Main/>
        },
        {
            path: '/add',
            element: <Add/>
        },
        {
            path: '/edit/:id',
            element: <Edit/>
        },
        {
            path: '*',
            element: <Navigate to='/' />
        }
    ])
}