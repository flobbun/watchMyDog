import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RoutePaths from '../../../constants/RoutePaths';
import { AuthProvider } from '../../../contexts/AuthContext';
import Error404 from '../../pages/Error404/Error404';
import Login from '../../pages/Login/Login';
import Menu from '../../pages/Menu/Menu';
import Stream from '../../pages/Stream/Stream';
import Watch from '../../pages/Watch/Watch';
import Layout from '../Layout/Layout';

const Router = () => {
  const routes = [
    {
      index: true,
      path: RoutePaths.HOME,
      element: <Menu />,
    },
    {
      path: RoutePaths.LOGIN,
      element: <Login />,
    },
    {
      path: RoutePaths.WATCH,
      element: <Watch />,
    },
    {
      path: RoutePaths.STREAM,
      element: <Stream />,
    },
    {
      orphan: true,
      path: '*',
      element: <Error404 />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePaths.HOME}>
          {routes.map(({ index, element, path, orphan }) => (
            <Route
              key={path}
              index={index || false}
              path={path}
              element={
                orphan ? (
                  element
                ) : (
                  <AuthProvider>
                    <Layout>{element}</Layout>
                  </AuthProvider>
                )
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
