import React from 'react';
import {Rating} from '@material-ui/lab';
import {TextField, InputLabel, FormControl, FormLabel, FormControlLabel, Select, Button, RadioGroup, Radio, Typography} from '@material-ui/core';
import styles from './productform.module.css'


const ProductFormComponent = (props) => {
    console.log(props);
    return (
        <div className={styles.card}>
            <p>Ingresa la información necesaria para {props.label} un producto:</p>
            <div className='inputs'>
                <TextField className={styles.input} id="outlined-basic" label="Codigo" variant="outlined"
                    value={props.product.code} onChange={(event) => props.handleCode(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Codigo de Barra" variant="outlined"
                    value={props.product.codebar} onChange={(event) => props.handleCodebar(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Nombre" variant="outlined"
                    value={props.product.name} onChange={(event) => props.handleName(event.target.value)}/>
                <TextField className={styles.input} id="outlined-basic" label="Precio" variant="outlined"
                    value={props.product.price} onChange={(event) => props.handlePrice(event.target.value)}/>
                <FormControl component="fieldset" className={styles.input}>
                    <FormLabel component="legend">Refrigerado</FormLabel>
                    <RadioGroup row aria-label="" name="freeze" value={props.product.freeze} onChange={(event) => props.handleFreeze(event.target.value)}>
                        <FormControlLabel value={1} control={<Radio />} label="Si" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={styles.input}>
                    <FormLabel component="legend">Libre de Impuesto</FormLabel>
                    <RadioGroup row aria-label="" name="tax" value={props.product.tax} onChange={(event) => props.handleTax(event.target.value)}>
                        <FormControlLabel value={1} control={<Radio />} label="Si" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={styles.input}>
                    <FormLabel component="legend">Necesidad de Recipe</FormLabel>
                    <RadioGroup row aria-label="" name="recipe" value={props.product.recipe} onChange={(event) => props.handleRecipe(event.target.value)}>
                        <FormControlLabel value={1} control={<Radio />} label="Si" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset" className={styles.input}>
                    <FormLabel component="legend">Regulado</FormLabel>
                    <RadioGroup row aria-label="" name="regulated" value={props.product.regulated} onChange={(event) => props.handleRegulated(event.target.value)}>
                        <FormControlLabel value={1} control={<Radio />} label="Si" />
                        <FormControlLabel value={0} control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <Typography component="legend">Rating</Typography>
                <Rating name='rate' value={props.product.rating} onChange={(event, value) => { props.handleRating(value); }}/>
                <FormControl component="fieldset" className={styles.input}>
                    <FormLabel component="legend">Clasificación ABC</FormLabel>
                    <RadioGroup row aria-label="" name="clasification" value={props.product.replacementClassification} onChange={(event) => props.handleClasification(event.target.value)}>
                        <FormControlLabel value={1} control={<Radio />} label="A" />
                        <FormControlLabel value={2} control={<Radio />} label="B" />
                        <FormControlLabel value={3} control={<Radio />} label="C" />
                    </RadioGroup>
                </FormControl>
                <TextField className={styles.input} id="outlined-basic" label="Nombre del Laboratorio | Proveedor" variant="outlined"
                    value={props.product.labProviderName} onChange={(event) => props.handleLabProviderName(event.target.value)}/>
                {/* <FormControl variant="outlined" className={styles.input}>
                    <InputLabel htmlFor="outlined-age-native-simple">Categoria</InputLabel>
                    <Select
                        native
                        value={props.product.category_id}
                        label="Categoria"
                        onChange={(event) => props.handleCategory(event.target.value)}
                        inputProps={{
                            name: 'category',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                            <option aria-label="None" value="" hidden/>
                        { props.categories.map((category, i) => 
                            <option value={category.id} key={i}>{category.name}</option>
                        )}
                    </Select>
                </FormControl> */}
                <FormControl variant="outlined" className={styles.input}>
                    <InputLabel htmlFor="outlined-age-native-simple">Subcategoria</InputLabel>
                    <Select
                        native
                        value={props.product.subcategory_id}
                        label="Subcategory"
                        onChange={(event) => props.handleSubcategoryId(event.target.value)}
                        inputProps={{
                            name: 'subcategory',
                            id: 'outlined-age-native-simple',
                        }}
                        >
                            <option aria-label="None" value="" hidden/>
                        { props.subcategories.map((subcategory, i) => 
                            <option value={subcategory.id} key={i}>{subcategory.name}</option>
                        )}
                    </Select>
                </FormControl>
            </div>
            <Button variant="contained" color='primary' className={styles.button} onClick={() => props.label === 'agregar' ? props.add(props.product) : props.update(props.product)}>{ props.label }</Button>
        </div>
    );

}

export default ProductFormComponent;
