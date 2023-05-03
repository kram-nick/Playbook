import { FC } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { IRoute, PrivateUIRoutes, UIRoutes } from "../router";
import { ScrollTop } from "../../ScrollToTop";

import Squeeze from "../../pages/Squeeze";
import TermsOfUse from "../../pages/TermsOfUse/TermsOfUse";
import HomePage from "../../pages/HomePage/HomePage";
import SignIn from "../../components/SignIn/SignIn";
import AppLayout from "../../components/AppLayout/AppLayout";
import SqueezeLayout from "../../components/AppLayout/SqueezeLayout/SqueezeLayout";
import DraftContainer from "../../pages/DraftContainer/DraftContainer";
import SignUp from "../../components/SignUp";
import MainContainer from "../../pages/MainContainer";
import Chapters from "../../pages/Chapters";
import Preview from "../../pages/Preview";

export const privateRoutes: IRoute[] = [
  {
    path: PrivateUIRoutes.Create,
    element: <DraftContainer />,
  },
  {
    path: PrivateUIRoutes.Chapters,
    element: <Chapters />,
  },  
  {
    path: PrivateUIRoutes.Main,
    element: <MainContainer />,
  },  
  {
    path: PrivateUIRoutes.Preview,
    element: <Preview />,
  },  
];

export const squeezeRoutes: IRoute[] = [
  {
    path: UIRoutes.SQUEEZE_SALES,
    element: <Squeeze />,
  },
  {
    path: UIRoutes.SQUEEZE_PRODUCT,
    element: <Squeeze />,
  },
  {
    path: UIRoutes.SQUEEZE_ENGINEERING,
    element: <Squeeze />,
  },
  {
    path: UIRoutes.SQUEEZE_ENTREPRENEUR,
    element: <Squeeze />,
  },
];

export const publicRoutes: IRoute[] = [
  {
    path: UIRoutes.HOME,
    element: <HomePage />,
  },
  { path: UIRoutes.TERM_OF_USE, element: <TermsOfUse /> },
  {
    path: UIRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: UIRoutes.SIGN_UP,
    element: <SignUp />,
  }  
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
        <Route path="/*" element={<SqueezeLayout />}>
          {squeezeRoutes.map((route, index) => (
            <Route key={`${route.path}${index}`} {...route} />
          ))}
          <Route
            path="*"
            element={<Navigate to={`/${UIRoutes.HOME}`} replace />}
          />
        </Route>
        <Route path="/*" element={<SqueezeLayout />}>
          {privateRoutes.map((route, index) => (
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
