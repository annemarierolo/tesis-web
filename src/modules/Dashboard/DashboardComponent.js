import React from 'react';
import SidebarComponent from '../../library/common/Sidebar/SidebarComponent';
import styles from './dashboard.module.css'
import profile from '../../resources/icons/profile.svg'
import { withRouter} from 'react-router-dom';

class DashboardComponent extends React.Component {

  constructor() {
    super();
    let user = JSON.parse(localStorage.getItem('user'))
    this.state = { user: user }
  }

  logOut = () => {
    localStorage.clear()
    this.props.history.push('/');
  }

  render = () => {
    return (
        <div className={styles.page}>
            <div className={styles['side-menu']}>
              <SidebarComponent user={this.state.user} logOut={this.logOut}></SidebarComponent>
            </div>
            <div className={styles['side-content']}>
              <div className={styles.box}>
                <div className={styles.content}>
                  <div className={styles.header}>
                  { (this.state.user) ?
                    <div className={styles.profile}>
                      <img alt='' className={styles.icon} src={profile}/>
                      <div className={styles.info}>
                        <label className={`${styles.text} ${styles['text-name']}`}>{this.state.user.firstName} {this.state.user.lastName}</label>
                        <label className={styles.text}>{this.state.user.role}</label> 
                      </div>
                    </div> :
                  null }
                  </div>
                  <div className={styles.views}>
                    { this.props.children }
                  </div>
                </div>
              </div>
            </div>
        </div>
    );
  }

}

export default withRouter(DashboardComponent);
