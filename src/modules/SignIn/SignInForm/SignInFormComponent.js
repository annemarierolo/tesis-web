import React from 'react';
import styles from './signinform.module.css';

const SignInFormComponent = (props) => {
    return(
        <div className={styles.card}>
            <div className={styles.content}>
                <h1 className={styles.welcome}> Bienvenido! </h1>
                <h2 className={styles.descrip} style={{color: "lightgray"}}> Ingrese sus datos </h2>
                <div className={styles.container}>
                    <div className={styles['input-container']}>
                        <div className={styles.title}>
                            <label className={styles['input-label']}>
                                Correo Electronico
                            </label>
                        </div>
                        <input 
                            type='email'
                            placeholder='Correo Electronico'
                            onChange={(event) => props.handleEmail(event.target.value) }
                            value={props.user.email}
                        />
                    </div>
                    <div className={styles['input-container']}>
                        <div className={styles.title}>
                            <label className={styles['input-label']}>
                            Contraseña
                            </label>
                        </div>
                        <input
                            type='password'
                            placeholder='Contraseña'
                            onChange={(event) => props.handlePassword(event.target.value) }
                            value={props.user.password}
                        />
                    </div>

                    <div className={styles['button-container']}>
                        <button 
                            className={props.user.email === '' || props.user.password === '' ? `${styles['disabled-button']}` : `${styles.button}` }
                            onClick={props.signIn}
                            disabled={props.user.email === '' || props.user.password === ''}>
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInFormComponent;