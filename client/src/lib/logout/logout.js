import React from "react";
import './logout.css';
import { Button } from "react-bootstrap";
import API from "../../utils/API";

export class Logout extends React.Component {
  disconnect = () => {
    API.logout();
    window.location = "/";
  };
  render() {
    return (
        <Button className="logout" onClick={this.disconnect}>
          Log out
        </Button>
    );
  }
}