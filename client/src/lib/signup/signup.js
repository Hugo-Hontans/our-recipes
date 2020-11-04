import React from "react";
import './signup.css';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import API from "../../utils/API";
import { Link } from "react-router-dom";

export class Signup extends React.Component {
  state = {
    name: "",
    password: "",
    cpassword: ""
  };
  send = async () => {
    const { name, password, cpassword } = this.state;
    if (!name || name.length === 0) return;
    if (!password || password.length === 0 || password !== cpassword) return;
    try {
      const { data } = await API.signup({ name, password });
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
    const { name, password, cpassword } = this.state;
    return (
      <form onSubmit={(event) => {this.send(); event.preventDefault();}}>
        <FormGroup className="col-8 col-md-12 center" controlId="name">
          <FormLabel>Name</FormLabel>
          <FormControl
            autoComplete="username"
            autoFocus
            type="text"
            value={name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup className="col-8 col-md-12 center" controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            autoComplete="new-password"
            value={password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup className="col-8 col-md-12 center" controlId="cpassword">
          <FormLabel>Confirm Password</FormLabel>
          <FormControl
            autoComplete="new-password"
            value={cpassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <div className="d-flex justify-content-center">
            <Button type="submit">
                Sign up
            </Button>
        </div>
        <div className="d-flex justify-content-center signup">
            Or
        </div>
        <div className="d-flex justify-content-center signup">
            <Link to="/login">
                <Button>
                    Log in
                </Button>
            </Link>
        </div>
      </form>
    );
  }
}