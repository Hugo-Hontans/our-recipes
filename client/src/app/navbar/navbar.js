import React from "react";
import "./navbar.css";
import { Navbar } from "react-bootstrap";
import { ChefHat } from "../../assets/icons/chef-hat";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

const disconnect = () => {
  API.logout();
  window.location = "/";
}

export const TopNavbar = () =>
  <Navbar bg="dark" variant="dark" className="navbar justify-content-between">
    <Navbar.Brand>
      <Link to="/home">
        <ChefHat></ChefHat>
        Our recipes
      </Link>
    </Navbar.Brand>
    {
      API.isAuth()
      ? <Button className="auth-button" onClick={disconnect}>
          Log out
        </Button>
      : <Link to="/">
          <Button className="auth-button">
            Log in
          </Button>
        </Link>
    }
  </Navbar>