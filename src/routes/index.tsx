import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '../pages/Home';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import ListagemCaronas from '../pages/Listagem-caronas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/caronas',
    element: <ListagemCaronas />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
