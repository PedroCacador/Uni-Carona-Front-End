import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Home } from '../pages/Home';
import Cadastro from '../pages/Register';
import Login from '../pages/Login';
import ListagemCaronas from '../pages/Listagem-caronas';

import Perfil from '../pages/Perfil';
import SobreNos from '../pages/SobreNos';
import Servicos from '../pages/Servicos';
import Seguranca from '../pages/Seguranca';
import { Header } from '../components/Header';

// Layout com Header — para páginas internas
const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 md:pt-32">
        <Outlet />
      </main>
    </div>
  );
};

// Layout limpo — para páginas de autenticação (sem Header, sem padding-top)
const AuthLayout = () => {
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/caronas',
        element: <ListagemCaronas />,
      },
      {
        path: '/sobre',
        element: <SobreNos />,
      },
      {
        path: '/servicos',
        element: <Servicos />,
      },
      {
        path: '/seguranca',
        element: <Seguranca />,
      },
      {
        path: '/perfil',
        element: <Perfil />,
      },
    ],
  },
  {


    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/cadastro',
        element: <Cadastro />,
      },
    ],

  },
  {
    path: '/perfil',
    element: <Perfil />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
