import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga4";
import { hotjar } from "react-hotjar";

import "./index.css";
import App from "./App";
import { store } from "./core/store";

ReactGA.initialize(process.env.REACT_APP_ANALYTICS_ID);
hotjar.initialize(3510959, 6);

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
