import React from 'react';
import styles from './user.module.css'
import Button from '@material-ui/core/Button';
import UserFormComponent from './UserForm/UserFormComponent';
import UserService from '../../main/services/User/UserService'
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent';
import RolesService from '../../main/services/Roles/RolesService';


class UserComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        {title: "Nombre", field: "firstName"},
        {title: "Apellido", field: "lastName"},
        {title: "Email", field: "email"}
      ],
      roles: [],
      users: [],
      user: null,
      form: false,
      button: 'Agregar'
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchUsers = async () => {
    this.setState({ users: await UserService.fetchData() })
    await console.log(this.state.users.length > 0);
  }
  
  fetchRoles = async () => {
    this.setState({ roles: await RolesService.fetchData() })
    await console.log(this.state.roles.length > 0);
  }

  updateUser = async () => {
    let user = await UserService.updateUser(this.state.user)
    if (user) {
      await this.fetchUsers()
      await this.showForm('Agregar')
    };
    
  }

  showForm = (label, newUser=null) => {
    console.log(label);
    this.setState((prevState) => {
        let form = !prevState.form;
        let button = label;
        let user = newUser ? newUser : {firstName:'', middleName:'', lastName:'', secondLastName:'', email:'', password:'', phoneNumber:'', rol:1};
        return { form, button, user };
    })
  }

  handleFirstName = (firstName) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.firstName = firstName;
        return { user };
    })
  }

  handleMiddleName = (middleName) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.middleName = middleName;
        return { user };
    })
  }

  handleLastName = (lastName) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.lastName = lastName;
        return { user };
    })
  }

  handleSecondLastName = (secondLastName) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.secondLastName = secondLastName;
        return { user };
    })
  }

  handleIdentificationNumber = (identificationNumber) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.identificationNumber = identificationNumber;
        return { user };
    })
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

  handlePhoneNumber = (phoneNumber) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.phoneNumber = phoneNumber;
        return { user };
    })
  }

  render = () => {
    return (
        <div>
            {/* <h1>Users Component!</h1> */}
            <div className={styles.table}>
              { !this.state.form ? 
              <TableResponsiveComponent title='Usuarios' headers={this.state.headers} actions={this.state.actions} data={this.state.users} fetchData={this.fetchData} showForm={this.showForm}/> 
              : <UserFormComponent 
                label={this.state.button}
                roles={this.state.roles}
                user={this.state.user}
                hideForm={this.showForm}
                handleFirstName={this.handleFirstName}
                handleMiddleName={this.handleMiddleName}
                handleLastName={this.handleLastName}
                handleSecondLastName={this.handleSecondLastName}
                handleIdentificationNumber={this.handleIdentificationNumber}
                handleEmail={this.handleEmail}
                handlePassword={this.handlePassword}
                handlePhoneNumber={this.handlePhoneNumber}
                updateUser={this.updateUser}
                /> }
            </div>
            <div className={styles.button}>
              { !this.state.form ? <Button variant="contained" color={ !this.state.form ? `primary` : `secondary` } className={styles.button} onClick={()=>this.showForm('Agregar')}>+</Button> : undefined }
            </div>
        </div>
    );
  }

}

export default UserComponent;
