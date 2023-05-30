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
import PreviewDetail from "../../pages/PreviewDetail";
import Profile from "../../pages/Profile";
import PlaybookDetail from "../../pages/PlaybookDetail";
import Settings from "../../pages/Settings";
import NewPassword from "../../components/NewPassword";
import ResetPassword from "../../components/ResetPassword";
import SignLayout from "../../components/AppLayout/SignLayout";
import PrivateLayout from "../../components/AppLayout/PrivateLayout";
import Discover from "../../pages/Discover";
import Payment from "../../pages/Payment/Payment";

export const privateRoutes: IRoute[] = [
  {
    path: `${PrivateUIRoutes.Create}/:playbook_id`,
    element: <DraftContainer />,
  },
  {
    path: `${PrivateUIRoutes.Create}/:playbook_id/:page_id`,
    element: <DraftContainer />,
  },
  {
    path: `${PrivateUIRoutes.Chapters}/:playbook_id`,
    element: <Chapters />,
  },
  {
    path: PrivateUIRoutes.Main,
    element: <MainContainer />,
  },
  {
    path: `${PrivateUIRoutes.Preview}/:playbook_id`,
    element: <Preview />,
  },
  {
    path: PrivateUIRoutes.PreviewChapter,
    element: <PreviewDetail />,
  },
  {
    path: PrivateUIRoutes.Profile,
    element: <Profile />,
  },
  {
    path: PrivateUIRoutes.CardDetail,
    element: <PlaybookDetail />,
  },
  {
    path: PrivateUIRoutes.Settings,
    element: <Settings />,
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
  {
    path: UIRoutes.DISCOVER,
    element: <Discover />,
  },
  { path: UIRoutes.TERM_OF_USE, element: <TermsOfUse /> },
  { path: UIRoutes.PAYMENT, element: <Payment /> },
];

export const singRoutes: IRoute[] = [
  {
    path: UIRoutes.SIGN_IN,
    element: <SignIn />,
  },
  {
    path: UIRoutes.SIGN_UP,
    element: <SignUp />,
  },
  {
    path: UIRoutes.NEW_PASSWORD,
    element: <NewPassword />,
  },
  {
    path: UIRoutes.RESET_PASSWORD,
    element: <ResetPassword />,
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
        <Route path="/*" element={<SqueezeLayout />}>
          {squeezeRoutes.map((route, index) => (
            <Route key={`${route.path}${index}`} {...route} />
          ))}
          <Route
            path="*"
            element={<Navigate to={`/${UIRoutes.HOME}`} replace />}
          />
        </Route>
        <Route path="/*" element={<PrivateLayout />}>
          {privateRoutes.map((route, index) => (
            <Route key={`${route.path}${index}`} {...route} />
          ))}
          <Route
            path="*"
            element={<Navigate to={`/${UIRoutes.HOME}`} replace />}
          />
        </Route>
        <Route path="/*" element={<SignLayout />}>
          {singRoutes.map((route, index) => (
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
