import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import { hotjar } from "react-hotjar";
import jwtDecode from "jwt-decode";

import "./index.css";
import App from "./App";
import { store } from "./core/store";
import { UIRoutes } from "./core/router";

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
hotjar.initialize(3510959, 6);

if (localStorage.getItem(process.env.REACT_APP_TOKEN_KEY)) {
  const expiration: any = jwtDecode(
    String(localStorage.getItem(process.env.REACT_APP_TOKEN_KEY))
  );
  if (new Date() > new Date(parseInt(expiration.exp) * 1000)) {
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(`/${UIRoutes.SIGN_IN}`);
    }, 100);
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
