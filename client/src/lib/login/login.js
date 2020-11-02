import React from "react";
import './login.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../utils/API";
import { Link } from "react-router-dom";

export class Login extends React.Component {
  state = {
    name: "",
    password: ""
  };
  send = async () => {
    const { name, password } = this.state;
    if (!name || name.length === 0) {
      return;
    }
    if (!password || password.length === 0) {
      return;
    }
    try {
      const { data } = await API.login(name, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      window.location = "/home";
    } catch (error) {
      console.error(error);
    }
  };
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  render() {
    const { name, password } = this.state;
    return (
      <form onSubmit={(event) => {this.send(); event.preventDefault();}}>
        <FormGroup  className="col-8 col-md-12 center" controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            autoFocus
            autoComplete="username"
            type="text"
            value={name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="col-8 col-md-12 center" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            autoComplete="current-password"
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <div className="d-flex justify-content-center">
            <Button type="submit">
                Log in
            </Button>
        </div>
        <div className="d-flex justify-content-center signup">
            Or
        </div>
        <div className="d-flex justify-content-center signup">
            <Link to="/signup">
                <Button>
                    Sign up
                </Button>
            </Link>
        </div>
      </form>
    );
  }
}