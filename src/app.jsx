import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Homepage from "./features/homepage"
import Login from "./features/login"

export default function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <Homepage />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

      </Switch>
    </BrowserRouter>
  )
}