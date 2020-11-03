import React from "react";
import './logout.css';
import { Button } from "react-bootstrap";
import API from "../../utils/API";

const disconnect = () => {
  API.logout();
  window.location = "/";
}

export const Logout = () => 
  <Button className="logout" onClick={disconnect}>
    Log out
  </Button>
