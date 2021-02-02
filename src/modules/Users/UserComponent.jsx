import React from 'react';
import styles from './user.module.css'

class UserComponent extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render = () => {
    return (
        <div className={styles.page}>
            <h1>Users Component!</h1>
        </div>
    );
  }

}

export default UserComponent;
