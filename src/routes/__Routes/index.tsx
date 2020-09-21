import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "../../containers/LandingPage";
import MapView from "../../containers/MapView";
import About from "../../containers/About";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/maps" component={MapView} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
}
