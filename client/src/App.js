import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home } from "./app/home/home";
import { Login } from "./lib/login/login";
import { Signup } from "./lib/signup/signup";
import { TopNavbar } from "./app/navbar/navbar";
import API from "./utils/API";
import { RecipeCreate } from "./app/recipe-create/recipe-create";
import { Footer } from "./app/footer/footer";
import { RecipeView } from "./app/recipe-view/recipe-view";

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
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/login" component={Login}>
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
              <Route path="/view/:id">
                <RecipeView></RecipeView>
              </Route>
              <Route path="/create">
                {
                  API.isAuth()
                  ? <RecipeCreate></RecipeCreate>
                  : <Redirect to="/login" />
                } 
              </Route>
            </Switch>
          </div>
        </section>
        {
          API.isAuth()
          ? <Footer></Footer>
          : null
        }
      </Router>
    );
  }
}

export default App;