// LOGIN PARA MANEJO DE LA SESIÓN
import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = { authUser: null };
    }
    // Escucha a usuarios autenticados con onAuthStateChanged de Firebase
    // onAuthStateChanged recibe una función como parámetro que tiene acceso al usuario autenticado
    // & la función aprobada se llama cada vez que algo cambia para el usuario autenticado
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
          // Si un usuario cierra sesión, el objeto authUser se vuelve nulo
          // por lo que la propiedad authUser en el estado local se establece en nulo
        },
      );
    }
    // Elimina el oyente si el componente se desmonta
    componentWillUnmount() {
      this.listener();
    }

    // componentDidMount() {
    //   this.listener = this.props.firebase.auth.onAuthStateChanged(
    //     authUser => {
    //       authUser
    //         ? this.setState({ authUser })
    //         : this.setState({ authUser: null });
    //     },
    //   );
    // }
    // componentWillUnmount() {
    //   this.listener();
    // }
    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }
  return withFirebase(WithAuthentication);
};
export default withAuthentication;