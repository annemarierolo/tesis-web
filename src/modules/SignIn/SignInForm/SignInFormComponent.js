import React, { useState } from 'react';
import styles from './signinform.module.css';
import { Alert } from '@material-ui/lab';

const SignInFormComponent = (props) => {
    const [emailValidation, setEmailValidation] = useState(true);

    return(
        <div className={styles.card}>
            <div className={styles.content}>
                <h1 className={styles.welcome}> Bienvenido! </h1>
                <h2 className={styles.descrip} style={{color: "lightgray"}}> Ingrese sus datos </h2>
                <div className={styles.container}>
                    <div className={styles['input-container']}>
                        <div className={styles.title}>
                            <label className={styles['input-label']}>
                                Correo Electrónico
                            </label>
                        </div>
                        <input
                            className={styles.email}
                            type='email'
                            placeholder='Correo Electrónico'
                            onChange={(event) => {
                                props.handleEmail(event.target.value) 
                                var emailInput = document.querySelector('.signinform_email__3xcCE');
                                var re = /\S+@\S+\.\S+/;
                                setEmailValidation(re.test(event.target.value));
                                if (!(re.test(event.target.value))) emailInput.classList.add('signinform_error__3pcVa')
                                else emailInput.classList.remove('signinform_error__3pcVa')
                            }}
                            value={props.user.email}
                        />
                        { (!emailValidation) && <p className={styles.errormsg} >Correo Invalido</p> }
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

                    { (props.error) ? <Alert className={styles.alert} severity="error">{props.errorMsg}</Alert> : null }

                </div>
            </div>
        </div>
    );
}

export default SignInFormComponent;