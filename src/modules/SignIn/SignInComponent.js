import React from 'react';
import SignInFormComponent from './SignInForm/SignInFormComponent';
import SignInSideComponent from './SignInSide/SignInSideComponent';
import SignInService from '../../main/services/SignIn/SignInService'
import styles from './signin.module.css'

import { connect } from 'react-redux';
import * as productActions from '../../library/redux/actions/productActions'

class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: false,
      errorMsg: '',
      loading: false
    };
  }

  componentDidMount = () => {
    this.props.clearProducts();
    localStorage.clear();
  }

  handleEmail = (email) => {
      this.setState((prevState) => {
          let user = Object.assign({}, prevState.user);
          user.email = email;
          return { user };
      })
  }

  handlePassword = (password) => {
      this.setState((prevState) => {
          let user = Object.assign({}, prevState.user);
          user.password = password;
          return { user };
      })
  }

  signIn = async () => {
    let user = await SignInService.SignIn(this.state.user).catch((error) => {
      console.log(error.response);
      this.setState({ error: true, errorMsg: error.response.data.error })
    })
    if (user) {
      this.setState({ userError: false })
      await localStorage.setItem('token', user.token)
      await localStorage.setItem('user', JSON.stringify(user.user))
      await this.props.history.push('/dash/product')
      this.props.fetchProducts();
    };
    
  }

  render = () => {
    return (
      <div className={styles.page}>
        <div className={styles['side-image']}>
          <SignInSideComponent></SignInSideComponent>
        </div>
        <div className={styles['side-form']}>
          <SignInFormComponent
            handleEmail={this.handleEmail}
            handlePassword={this.handlePassword}
            signIn={this.signIn}
            user={this.state.user}
            error={this.state.error}
            errorMsg={this.state.errorMsg}
          ></SignInFormComponent>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return state.productReducers;
};

export default connect(mapStateToProps, productActions)(SignInComponent);