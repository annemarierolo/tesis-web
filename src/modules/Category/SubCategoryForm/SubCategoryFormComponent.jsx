import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import styles from './subcategoryform.module.css'


const SubCategoryFormComponent = (props) => {
    return (
        <div className={styles.card}>
            {/* <h1>{props.label} Subcategoria</h1> */}
            <p>Una subcategoria es una clase que resulta de una clasificación de productos.</p>
            <p>La jerarquia es Categoria > Subcategoria > Producto.</p>
            <p>Ingresa la información necesaria para {props.label} la subcategoria:</p>
            <div className='inputs'>
                <TextField className={styles.input} id="outlined-basic" label="Nombre" variant="outlined"
                    value={props.subcategory.name} onChange={(event) => props.handleSubCategoryName(event.target.value)} />
                <FormControl variant="outlined" className={styles.input}>
                    <InputLabel htmlFor="outlined-age-native-simple">Categoria</InputLabel>
                    <Select
                        native
                        value={props.subcategory.category_id}
                        label="Categoria"
                        onChange={(event) => props.handleCategoryId(event.target.value)}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-age-native-simple',
                        }}
                    >
                        <option aria-label="None" value="" hidden />
                        {props.categories.map((category, i) =>
                            <option value={category.id} key={i}>{category.name}</option>
                        )}
                    </Select>
                </FormControl>
            </div>
            {/* <Button variant="contained" color='secondary' className={styles.button} onClick={props.hide}>Cancelar</Button> */}
            <Button variant="contained" color='primary' className={styles.button} onClick={() => props.label === 'agregar' ? props.add(props.subcategory) : props.update(props.subcategory)}>{props.label}</Button>
        </div>
    );
}

export default SubCategoryFormComponent;
