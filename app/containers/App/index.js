/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "containers/HomePage/Loadable";
import Favorites from "containers/Favorites/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";

import GlobalStyle from "../../global-styles";

export default function App() {
  return (
    <div>
      <div className="card"><h1>gipho</h1></div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/faves" component={Favorites} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
