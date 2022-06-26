import { Route, Switch } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);
