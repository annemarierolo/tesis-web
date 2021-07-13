import React, { useState } from 'react';
import {Button, Select, FormControl, InputLabel, OutlinedInput, InputAdornment, TextField, IconButton} from '@material-ui/core/';
import {Visibility, VisibilityOff} from '@material-ui/icons'
import styles from './userform.module.css'


const UserFormComponent = (props) => {
    const [showPassword, setPassword] = useState(false);
    const [emailValidation, setEmailValidation] = useState(true);
    return (
        <div className={styles.card}>
            {/* <h1>{props.label} Usuario</h1> */}
            <p>Ingresa la información necesaria para {props.label} un usuario:</p>
            <div className='inputs'>
                <form>
                    <TextField className={styles.input} id="outlined-basic" label="Primer Nombre" variant="outlined"
                        value={props.user.firstName} onChange={(event) => { if ((isNaN(event.nativeEvent.data) || event.nativeEvent.data == null) && event.target.value.length <= 15) props.handleFirstName(event.target.value)}} required/>
                    <TextField className={styles.input} id="outlined-basic" label="Segundo Nombre" variant="outlined"
                        value={props.user.middleName} onChange={(event) =>  { if ((isNaN(event.nativeEvent.data) || event.nativeEvent.data == null) && event.target.value.length <= 15) props.handleMiddleName(event.target.value)}}/>
                    <TextField className={styles.input} id="outlined-basic" label="Primer Apellido" variant="outlined"
                        value={props.user.lastName} onChange={(event) =>  { if ((isNaN(event.nativeEvent.data) || event.nativeEvent.data == null) && event.target.value.length <= 15) props.handleLastName(event.target.value)}} required/>
                    <TextField className={styles.input} id="outlined-basic" label="Segundo Apellido" variant="outlined"
                        value={props.user.secondLastName} onChange={(event) =>  { if ((isNaN(event.nativeEvent.data) || event.nativeEvent.data == null) && event.target.value.length <= 15) props.handleSecondLastName(event.target.value)}} required/>
                    <TextField className={styles.input} id="outlined-basic" label="Cedula" variant="outlined"
                        value={props.user.identificationNumber} onChange={(event) => { if ((!isNaN(event.nativeEvent.data) || event.nativeEvent.data == null) && event.target.value.length <= 15) props.handleIdentificationNumber(event.target.value)}} required/>
                    <TextField className={styles.input} error={!emailValidation && props.user.email !== ''} helperText={(!emailValidation && props.user.email !== '') ? 'Correo Invalido' : ''} id="outlined-basic" label="Correo Electrónico" variant="outlined"
                        value={props.user.email}
                        onChange={(event) => {
                            var re = /\S+@\S+\.\S+/;
                            setEmailValidation(re.test(event.target.value));
                            if (event.target.value.length <= 50) props.handleEmail(event.target.value)}
                        }
                    required/>
                    <FormControl variant="outlined" className={styles.input} required>
                        <InputLabel>Contraseña</InputLabel>
                        <OutlinedInput id="outlined-basic"
                            value={props.user.password} label="Contraseña" type={(showPassword ? 'text' :  'password')}
                            onChange={(event) => { if (event.target.value.length <= 20) props.handlePassword(event.target.value)}} 
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setPassword(!showPassword)}
                                >
                                    {props.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }/>
                    </FormControl>
                    <TextField className={styles.input} id="outlined-basic" label="Telefono" variant="outlined"
                        value={props.user.phoneNumber} onChange={(event) => { if (event.target.value.length <= 20) props.handlePhoneNumber(event.target.value)}}/>
                    <FormControl variant="outlined" className={styles.input} required>
                        <InputLabel htmlFor="outlined-age-native-simple">Rol</InputLabel>
                        <Select
                            native
                            value={props.user.role_id}
                            label="Rol"
                            onChange={(event) => props.handleRol(event.target.value)}
                            inputProps={{
                                name: 'rol',
                                id: 'outlined-age-native-simple',
                            }}
                            >
                                <option aria-label="None" value="" hidden/>
                            { props.roles.map((rol, i) => 
                                <option value={rol.id} key={i}>{rol.name}</option>
                            )}
                        </Select>
                    </FormControl>
                    <Button  
                        variant="contained" color='primary' className={styles.button} 
                        onClick={() => props.label === 'agregar' ? props.addUser(props.user) : props.updateUser(props.user)}
                        disabled={
                            props.user.firstName === '' || props.user.lastName === '' || 
                            props.user.secondLastName === '' || props.user.identificationNumber === '' || props.user.email === '' || 
                            emailValidation === false || props.user.password === '' || props.user.role_id === '' 
                        }
                    >
                        { props.label }
                    </Button>
                </form>
            </div>
            {/* <Button variant="contained" color='secondary' className={styles.button} onClick={props.hideForm}>Cancelar</Button> */}
            {/* <Button variant="contained" color='primary' className={styles.button} onClick={() => props.label === 'agregar' ? props.addUser(props.user) : props.updateUser(props.user)}>{ props.label }</Button> */}
        </div>
    );

}

export default UserFormComponent;
