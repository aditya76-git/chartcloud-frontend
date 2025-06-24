// src/routes/Route.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteConfig from './route-config';
import PrivateRoute from './private-route';

const AppRoutes = () => {
  return (
    <Routes>
      {RouteConfig.map(({ path, element, isPrivate }) => {
        
        if (isPrivate) {
          return (
            <Route key={path} path={path} element={<PrivateRoute />}>
              <Route path={path} element={element} />
            </Route>
          );
        }

        return <Route key={path} path={path} element={element} />;
      })}
    </Routes>
  );
};

export default AppRoutes;
