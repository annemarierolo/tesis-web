import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import styles from './userform.module.css'


const UserFormComponent = (props) => {
    /* console.log(props); */
    return (
        <div className={styles.card}>
            {/* <h1>{props.label} Usuario</h1> */}
            <p>Ingresa la información necesaria para {props.label} un usuario:</p>
            <div className='inputs'>
                <TextField className={styles.input} id="outlined-basic" label="Primer Nombre" variant="outlined"
                    value={props.user.firstName} onChange={(event) => props.handleFirstName(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Segundo Nombre" variant="outlined"
                    value={props.user.middleName} onChange={(event) => props.handleMiddleName(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Primer Apellido" variant="outlined"
                    value={props.user.lastName} onChange={(event) => props.handleLastName(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Segundo Apellido" variant="outlined"
                    value={props.user.secondLastName} onChange={(event) => props.handleSecondLastName(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Cedula" variant="outlined"
                    value={props.user.identificationNumber} onChange={(event) => props.handleIdentificationNumber(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Correo Electronico" variant="outlined"
                    value={props.user.email} onChange={(event) => props.handleEmail(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Contraseña" variant="outlined"
                    value={props.user.password} onChange={(event) => props.handlePassword(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Telefono" variant="outlined"
                    value={props.user.phoneNumber} onChange={(event) => props.handlePhoneNumber(event.target.value)}/>
                <FormControl variant="outlined" className={styles.input}>
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
            </div>
            {/* <Button variant="contained" color='secondary' className={styles.button} onClick={props.hideForm}>Cancelar</Button> */}
            <Button variant="contained" color='primary' className={styles.button} onClick={() => props.label === 'agregar' ? props.addUser(props.user) : props.updateUser(props.user)}>{ props.label }</Button>
        </div>
    );

}

export default UserFormComponent;
