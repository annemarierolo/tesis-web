import React from 'react';
import SignInFormComponent from './SignInForm/SignInFormComponent';
import SignInSideComponent from './SignInSide/SignInSideComponent';
import SignInService from '../../main/services/SignIn/SignInService'
import styles from './signin.module.css'

class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    };
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
    let user = await SignInService.SignIn(this.state.user)
    if (user) {
      await localStorage.setItem('token', user.token)
      await localStorage.setItem('user', JSON.stringify(user.user))
      await this.props.history.push('/dash')
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
              ></SignInFormComponent>
            </div>
        </div>
    );
  }

}

export default SignInComponent;
