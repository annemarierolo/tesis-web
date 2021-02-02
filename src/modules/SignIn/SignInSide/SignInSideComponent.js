import React from 'react';
import styles from './signinside.module.css';
import image from '../../../resources/images/pharmacy-home.svg'

const SignInSideComponent = (props) => {
    return(
        <div className={styles['image-card']}>
            <div className={styles.content}>
                <img alt='' className={styles.image} src={image}/>
                <h1 className={styles.title}>
                    Farmacia Luz Eléctrica
                </h1>
                <h3 className={styles.descrip}>
                    Más que una farmacia
                </h3>
            </div>
        </div>
    );
}

export default SignInSideComponent;