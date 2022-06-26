import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./routes";
import { GlobalStyle } from "./styles/global";

export const App: React.FC = () => (
  <Fragment>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
  </Fragment>
);
