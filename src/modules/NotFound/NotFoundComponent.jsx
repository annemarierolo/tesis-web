import React from 'react';
import styles from './notfound.module.css';
import image from '../../resources/images/not-found.svg'

class NotFoundComponent extends React.Component {

  render = () => {
    return (
        <div className={styles.page}>
            <img alt='' className={styles.image} src={image}/>
        </div>
    );
  }

}

export default NotFoundComponent;
