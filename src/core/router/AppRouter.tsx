import React, { FC } from "react";
import { IRoute, UIRoutes } from "../router";
import HomePage from "../../components/HomePage/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ScrollTop } from "../../ScrollToTop";
import { AppLayout } from "../../components/Layout/AppLayout";
import Squeeze from "../../components/Squeeze";
import TermsOfUse from "../../components/TermsOfUse/TermsOfUse";

export const publicRoutes: IRoute[] = [
  {
    path: UIRoutes.HOME,
    element: <HomePage />,
  },
  { path: UIRoutes.TERM_OF_USE, element: <TermsOfUse /> },
  {
    path: UIRoutes.SQUEEZE,
    element: <Squeeze />,
  },
];

const AppRouter: FC = () => {
  return (
    <ScrollTop>
      <Routes>
        <Route path="/*" element={<AppLayout />}>
          {publicRoutes.map((route, index) => (
            <Route key={`${route.path}${index}`} {...route} />
          ))}
          <Route
            path="*"
            element={<Navigate to={`/${UIRoutes.HOME}`} replace />}
          />
        </Route>
      </Routes>
    </ScrollTop>
  );
};

export default AppRouter;
