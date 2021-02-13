import React from 'react';
import styles from './user.module.css'
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent';
import UserService from '../../main/services/User/UserService'

class UserComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        {title: "Nombre", field: "firstName"},
        {title: "Apellido", field: "lastName"},
        {title: "Email", field: "email"}
      ],
      users: [],
      form: false
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    this.setState({ users: await UserService.fetchData() })
    await console.log(this.state.users.length > 0);
  }

  render = () => {
    return (
        <div className={styles.page}>
            <h1>Users Component!</h1>
            <TableResponsiveComponent title='Usuarios' headers={this.state.headers} data={this.state.users} fetchData={this.fetchData} />
        </div>
    );
  }

}

export default UserComponent;
