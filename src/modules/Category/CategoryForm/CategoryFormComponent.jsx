import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './categoryform.module.css'


const CategoryFormComponent = (props) => {
    return (
        <div className={styles.card}>
            {/* <h1>{props.label} Categoria</h1> */}
            <p>Una categoria es una clase que resulta de una clasificación de subcategorias.</p>
            <p>La jerarquia es Categoria > Subcategoria > Producto.</p>
            <p>Ingresa la información necesaria para {props.label} la categoria:</p>
            <div className='inputs'>
                <TextField className={styles.input} id="outlined-basic" label="Nombre" variant="outlined" 
                    value={props.category.name} onChange={(event) => { if (event.target.value.length < 50) props.handleCategoryName(event.target.value)}} required/>
            </div>
            {/* <Button variant="contained" color='secondary' className={styles.button} onClick={props.hide}>Cancelar</Button> */}
            <Button variant="contained" color='primary' disabled={ props.category.name === '' } className={styles.button} onClick={() => props.label === 'agregar' ? props.add(props.category) : props.update(props.category)}>{ props.label }</Button>
        </div>
    );
}

export default CategoryFormComponent;
