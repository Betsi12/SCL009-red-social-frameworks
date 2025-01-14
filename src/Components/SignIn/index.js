import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
const SignInPage = () => (
  <div>
    <h1>Iniciar Sesión</h1>
    <SignInForm />
    <p>
      Quiero <SignUpLink />
    </p>
    <p>
      <PasswordForgetLink />
    </p>
  </div>
);
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit}><label>Email Registrado</label>
      <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email"
      />
      <label>Constraseña</label>
      <input
        name="password"
        value={password}
        onChange={this.onChange}
        type="password"
        placeholder="Contraseña"
      />
      <button disabled={isInvalid} type="submit">
        Iniciar Sesión
      </button>{error && <p>{error.message}</p>}
      </form>
    );
  }
}
const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
export default SignInPage;
export { SignInForm };