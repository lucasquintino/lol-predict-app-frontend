import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Managers from "./pages/Managers";
import Live from "./pages/Live";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/schedule" />
      <Route path="/schedule" component={Managers} />
      <Route path="/live" component={Live} />

    </Switch>
  );
};

export default Routes;
