import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Managers from "./pages/Managers";
import Live from "./pages/Live";
import History from "./pages/History";

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/schedule" />
      <Route path="/schedule" component={Managers} />
      <Route path="/live" component={Live} />
      <Route path="/history/:teamName" component={History} />
    </Switch>
  );
};

export default Routes;
