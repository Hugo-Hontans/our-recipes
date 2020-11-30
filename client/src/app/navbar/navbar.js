import React from "react";
import "./navbar.css";
import { Navbar } from "react-bootstrap";
import { ChefHat } from "../../assets/icons/chef-hat";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import API from "../../utils/API";

const disconnect = () => {
  API.logout();
  window.location = "/login";
}

export const TopNavbar = () =>
  <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="navbar justify-content-between">
    <Navbar.Brand>
      <Link className="link-home" to="/home">
        <ChefHat></ChefHat>
        Our recipes
      </Link>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className="row justify-content-end align-items-center">
        { localStorage.getItem("name") ? <p className="name">Hi {localStorage.getItem("name")}</p> : null }
        <Link to="/create">
            <Button variant="success" className="action-button">
              Create my recipe
            </Button>
        </Link>
        {
          API.isAuth()
          ? <Button className="action-button" onClick={disconnect}>
              Log out
            </Button>
          : <Link to="/login">
              <Button className="action-button">
                Log in
              </Button>
            </Link>
        }
    </Navbar.Collapse>
  </Navbar>