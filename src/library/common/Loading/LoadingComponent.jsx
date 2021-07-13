import React from 'react';
import styles from './loading.module.css';
import image from '../../../resources/images/pills.svg'

const LoadingComponent = () => {
    return (
      <div className={styles.screen}>
        <div className={styles.typewriter}>
            <h1>Cargando...</h1><br></br>
            <img className={styles.loader} src={image} width='70' height='70' alt=''></img>
        </div>
      </div>
    )
  }

export default LoadingComponent;