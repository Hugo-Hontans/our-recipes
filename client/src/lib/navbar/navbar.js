import React from "react";
import "./navbar.css";
import { Navbar } from "react-bootstrap";
import { ChefHat } from "../../assets/icons/chef-hat";
import { Logout } from "../logout/logout";
import { Link } from "react-router-dom";

export const TopNavbar = () =>
  <Navbar bg="dark" variant="dark" className="navbar justify-content-between">
    <Navbar.Brand>
      <Link to="/home">
        <ChefHat width="38"></ChefHat>
        Our recipes
      </Link>
    </Navbar.Brand>
    <Logout></Logout>
  </Navbar>