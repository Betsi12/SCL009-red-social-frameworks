import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const withAutohorization = condition => Component => {
  class withAuthorization extends React.Component {
    //LOGIN DE AUTORIZACIÓN CON FIREBASE,
    //ACTIVA UNA FUNCIÓN DE LLAMADA ("condición ()") CADA VEZ QUE EL USUARIO AUTENTICADO CAMBIA
    // LA CONDICIÓN () SE EJECUTA CON EL AUTHUSER
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
        if (!condition(authUser)) {
          // condición () se ejecuta con el authUser
          this.props.history.push(ROUTES.SIGN_IN);
          // SI LA AUTORIZACIÓN FALLA,
          //por ejemplo porque el usuario autenticado es nulo,
          //el componente redirige a la página de inicio de sesión.
        }
      });
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return <Component {...this.props} />; // ----> Componente aprobado que debe protegerse
    }
  }
  return compose(
    withRouter,
    withFirebase
  )(withAuthorization);
};

export default withAutohorization;