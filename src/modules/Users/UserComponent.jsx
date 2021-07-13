import React from 'react';
import styles from './user.module.css'
import {Button, Grid, Box, Chip} from '@material-ui/core/';
import UserFormComponent from './UserForm/UserFormComponent';
import UserService from '../../main/services/User/UserService'
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent';
import RolesService from '../../main/services/Roles/RolesService';
import Alerts from '../../library/common/Alerts/Alert';
import { Delete, Edit, Clear, Visibility } from '@material-ui/icons';
import userPhoto from '../../resources/icons/profile.svg';

class UserComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        {title: "Nombre", field: "firstName"},
        {title: "Apellido", field: "lastName"},
        {title: "Correo Electrónico", field: "email"}
      ],
      actions: [
        {
          icon: Edit,
          tooltip: 'Editar',
          onClick: (event, rowData) =>  this.showSlide('editar', rowData)
        },
        { 
          icon: Visibility,
          tooltip: 'Ver',
          onClick: (event, rowData) => this.viewSlide(rowData)
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
      rol: '',
      form: false,
      button: 'agregar',
      table: true
    };
  }

  componentDidMount() {
    this.fetchUsers();
    this.fetchRoles();
  }

  fetchUsers = async () => {
    this.setState({ users: await UserService.fetchData().catch(() => Alerts.alertBar('Error Obteniendo Usuarios', 'error')), table: true })
    /* await console.log(this.state.users.length > 0); */
  }
  
  fetchRoles = async () => {
    this.setState({ roles: await RolesService.fetchData(), table: true })
    /* await console.log(this.state.roles.length > 0); */
  }

  addUser = async () => {
    let user = await UserService.addUser(this.state.user)
    .catch(() => Alerts.alertBar('Error Agregando Usuario', 'error'))
    if (user) {
      Alerts.alertBar('Usuario Agregado Exitosamente', 'success')
      await this.fetchUsers()
      await this.close()
    };
  }

  updateUser = async () => {
    let user = await UserService.updateUser(this.state.user)
    .catch(() => Alerts.alertBar('Error Modificando Usuario', 'error'))
    if (user) {
      Alerts.alertBar('Usuario Modificado Exitosamente', 'success')
      this.setState({table: false})
      await this.fetchUsers()
      await this.close()
    };
  }

  deleteUser = async (user) => {
    await Alerts.desitionAlert('Desea eliminarlo', user, UserService.deleteUser, this.fetchUsers, 'Usuario')
  }

  showSlide = (label, newUser = null) => {
    var slide = document.querySelector('.user_form__2fYng');
    /* var tables = document.querySelector('.user_tables__1vwmV'); */
    var blocked = document.querySelector('.user_blocked__2-CvM');
    slide.style.right = '0px';
    /* tables.style.opacity = '0.5'; */
    blocked.style.display = 'block';
    this.assignForm(label, newUser);
  }

  close = () => {
    var slide = document.querySelector('.user_form__2fYng');
    var tables = document.querySelector('.user_tables__1vwmV');
    var blocked = document.querySelector('.user_blocked__2-CvM');
    slide.style.right = '-1000px';
    tables.style.opacity = '1';
    blocked.style.display = 'none';
  }

  viewSlide = (userSelected) => {
    let rol = this.state.roles.filter(rol => rol.id === userSelected.role_id)[0]
    console.log(rol)
    this.setState({ user: userSelected, rol: rol })
    var slide = document.querySelector('.user_view__2Tzs9');
    slide.classList.add('user_activate__13K4r');
    var blocked = document.querySelector('.user_blocked__2-CvM');
    /* slide.style.top = '20%'; */
    blocked.style.display = 'block';
  }

  viewClose = () => {
    var slide = document.querySelector('.user_view__2Tzs9');
    var tables = document.querySelector('.user_tables__1vwmV');
    var blocked = document.querySelector('.user_blocked__2-CvM');
    slide.classList.remove('user_activate__13K4r');
    /* slide.style.top = '100%'; */
    tables.style.opacity = '1';
    blocked.style.display = 'none';
    this.setState({ user: {firstName:'', middleName:'', lastName:'', secondLastName:'', identificationNumber: '', email:'', password:'', phoneNumber:'', role_id: ''}, rol: '' })
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
            <div className={styles.blocked}></div>
            <div className={styles.tables}>
              <div className={styles.table}>
                { (this.state.table) && <TableResponsiveComponent title='Usuarios' headers={this.state.headers} actions={this.state.actions} data={this.state.users} deleteItem={this.deleteUser}/> }
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

            <div className={styles.view}>
              <div className={styles.view_header}>
                  <span className={styles.view_title}>Información de Usuario: {this.state.user.firstName} {this.state.user.lastName} </span>
                  <Clear onClick={this.viewClose}/>
              </div>
              <div className={styles.view_content}>
                  <Grid container justify="flex-start">
                      <Box style={{ width: '100%' }} marginLeft={4} my={0}>
                          <div className={styles.view_info} >
                              <img style={{ width: 300, height: 175 }} alt={this.state.user.firstName} src={userPhoto} />
                              <span> 
                                  <div className={styles.view_text}><strong>Nombre(s):</strong> {this.state.user.firstName} {this.state.user.middleName} </div>
                                  <div className={styles.view_text}><strong>Apellido(s):</strong> {this.state.user.lastName} {this.state.user.secondLastName} </div>
                                  <div className={styles.view_text}><strong>Cedula:</strong> {this.state.user.identificationNumber}</div>
                                  <div className={styles.view_text}><strong>Correo Electrónico:</strong> {this.state.user.email}</div>
                                  {<div className={styles.view_text}><strong>Rol:</strong> <Chip className={styles.chip} color="primary" label={this.state.rol.name}/></div>}
                              </span>
                          </div>
                      </Box>
                  </Grid>
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
