import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./lib/home/home";
import { Login } from "./lib/login/login.js";
import { Signup } from "./lib/signup/signup.js";
import { Logout } from "./lib/logout/logout.js";
import API from "./utils/API.js";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div className="d-flex justify-content-between"> 
          {
            API.isAuth()
            ? (<div>
                <Logout></Logout>
              </div>)
            : null
          }
        </div>
        <section className="container">
          <div className="row justify-content-center">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/home">
                {
                  API.isAuth()
                  ? <Home></Home>
                  : <Redirect to="/" />
                }
              </Route>
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

export default App;