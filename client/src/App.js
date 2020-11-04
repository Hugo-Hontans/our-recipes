import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./app/home/home";
import { Login } from "./lib/login/login";
import { Signup } from "./lib/signup/signup";
import { TopNavbar } from "./app/navbar/navbar";
import API from "./utils/API";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <TopNavbar></TopNavbar>
        <section className="container">
          <div className="row justify-content-center">
            <Switch>
              <Route exact path="/" component={Login}>
                {
                  API.isAuth()
                  ? <Redirect to="/home" />
                  : null
                }
              </Route>
              <Route exact path="/signup" component={Signup}>
                {
                  API.isAuth()
                  ? <Redirect to="/home" />
                  : null
                } 
              </Route>
              <Route path="/home">
                <Home></Home>
              </Route>
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

export default App;