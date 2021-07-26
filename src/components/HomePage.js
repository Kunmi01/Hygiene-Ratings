import React from "react";
import { PaginatedEstablishmentsTable } from "./PaginatedEstablishmentsTable";
import Background from "../static/logo.svg";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import EstablishmentPage from "./EstablishmentPage";

const logoStyle = {
  width: "90px",
  height: "60px",
  background: `transparent url(${Background}) no-repeat center/contain`,
  margin: "20px auto",
};

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <header style={logoStyle} />
        <Router>
          <Switch>
            <Route path="/" exact component={PaginatedEstablishmentsTable}></Route>
            <Route path="/details" exact render={(props) => <EstablishmentPage {...props} />}></Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}
