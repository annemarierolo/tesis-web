import React from 'react';
import styles from './user.module.css'
import Button from '@material-ui/core/Button';
import UserFormComponent from './UserForm/UserFormComponent';
import UserService from '../../main/services/User/UserService'
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent';
import RolesService from '../../main/services/Roles/RolesService';
import Alerts from '../../library/common/Alerts/Alert';
import { Delete, Edit, Clear } from '@material-ui/icons';

class UserComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        {title: "Nombre", field: "firstName"},
        {title: "Apellido", field: "lastName"},
        {title: "Email", field: "email"}
      ],
      actions: [
        {
          icon: Edit,
          tooltip: 'Editar',
          onClick: (event, rowData) =>  this.showSlide('editar', rowData)
        },
        { 
          icon: Delete,
          tooltip: 'Eliminar',
          onClick: (event, rowData) => this.deleteUser(rowData)
        }
      ], 
      roles: [],
      users: [],
      user: {firstName:'', middleName:'', lastName:'', secondLastName:'', identificationNumber: '', email:'', password:'', phoneNumber:'', role_id: ''},
      form: false,
      button: 'agregar'
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchUsers = async () => {
    this.setState({ users: await UserService.fetchData() })
    /* await console.log(this.state.users.length > 0); */
  }
  
  fetchRoles = async () => {
    this.setState({ roles: await RolesService.fetchData() })
    /* await console.log(this.state.roles.length > 0); */
  }

  addUser = async () => {
    let user = await UserService.addUser(this.state.user)
    if (user) {
      await this.fetchUsers()
      await this.close()
    };
    
  }

  updateUser = async () => {
    let user = await UserService.updateUser(this.state.user)
    if (user) {
      await this.fetchUsers()
      await this.close()
    };
    
  }

  deleteUser = async (user) => Alerts.desitionAlert('Desea eliminarlo', user, UserService.deleteUser, this.fetchUsers);

  showSlide = (label, newUser = null) => {
    var slide = document.querySelector('.user_form__2fYng');
    var tables = document.querySelector('.user_tables__1vwmV');
    slide.style.right = '0px';
    tables.style.opacity = '0.5';
    this.assignForm(label, newUser);
  }

  close = () => {
    var slide = document.querySelector('.user_form__2fYng');
    var tables = document.querySelector('.user_tables__1vwmV');
    slide.style.right = '-1000px';
    tables.style.opacity = '1';
  }

  assignForm = (label, newUser=null) => {
    this.setState((prevState) => {
        let form = !prevState.form;
        let button = label;
        let user = newUser ? newUser : {firstName:'', middleName:'', lastName:'', secondLastName:'', identificationNumber: '', email:'', password:'', phoneNumber:'', role_id: ''};
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

  handleRol = (rol) => {
    this.setState((prevState) => {
        let user = Object.assign({}, prevState.user);
        user.role_id = rol;
        console.log(user)
        return { user };
    })
  }

  render = () => {
    return (
        <div>
          <div className={styles.container}>
            <div className={styles.tables}>
              <div className={styles.table}>
                <TableResponsiveComponent title='Usuarios' headers={this.state.headers} actions={this.state.actions} data={this.state.users} deleteItem={this.deleteUser}/> 
              </div>
            </div>
            <div className={styles.form}>
              <div className={styles.header}>
                  <Clear onClick={this.close}/>
                  <span className={styles.title}> {this.state.button} Usuario </span>
              </div>
              <div className={styles.content}>
                <UserFormComponent 
                  label={this.state.button}
                  roles={this.state.roles}
                  user={this.state.user}
                  handleFirstName={this.handleFirstName}
                  handleMiddleName={this.handleMiddleName}
                  handleLastName={this.handleLastName}
                  handleSecondLastName={this.handleSecondLastName}
                  handleIdentificationNumber={this.handleIdentificationNumber}
                  handleEmail={this.handleEmail}
                  handlePassword={this.handlePassword}
                  handlePhoneNumber={this.handlePhoneNumber}
                  handleRol={this.handleRol}
                  addUser={this.addUser}
                  updateUser={this.updateUser}
                  />
              </div>
            </div>
            <div className={styles.button}>
              <Button variant="contained" color='primary' className={styles.button} onClick={()=>this.showSlide('agregar')}>+</Button>
            </div>
          </div>
        </div>
    );
  }

}

export default UserComponent;
