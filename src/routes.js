import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Managers from "./pages/Managers";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/managers" />
      <Route path="/managers" component={Managers} />
   

    </Switch>
  );
};

export default Routes;
