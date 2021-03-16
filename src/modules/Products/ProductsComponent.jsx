import React from 'react';
import styles from './products.module.css';
import {Skeleton, Rating} from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BarCode from '../../library/common/BarCode/BarCode';
import notFound from '../../resources/images/image-not-found.png';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ProductFormComponent from './ProductForm/ProductFormComponent';
import ProductService from '../../main/services/Product/ProductService';
import CategoryService from '../../main/services/Category/CategoryService';
import { Clear, Search, AcUnit, Receipt, LocalOffer, LocalMall } from '@material-ui/icons';
import {Grid, Box, Typography, FormControl, IconButton, Input, InputLabel, InputAdornment, Button, TablePagination, Menu, MenuItem, Chip, CircularProgress} from '@material-ui/core';

class ProductComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            loading: true,
            loadingCSV: false,
            filter: '',
            products: [],
            data : [],
            copy: [],
            actualview: [],
            page: 0,
            pages: 0,
            rowsPerPage: 8,
            product: { code:'', codebar:'', name: '', price: '', freeze: false, tax: false, recipe: false, regulated: false, rating: 0, replacementClassification: '', labProviderName: '', subcategory_id: '' },
            subcategories: [],
            menu: null,
            button: 'agregar'
        }
    }

    componentDidMount() {
        this.fetchSubCategories();
        this.fetchProducts();
    }

    initialConfig = () => {
        let copy = this.state.data;
        let actualview = this.state.data.slice(this.state.page*this.state.rowsPerPage, (this.state.page*this.state.rowsPerPage) + this.state.rowsPerPage)
        let pages = this.state.data.length;
        this.setState({copy, actualview, pages, loading: false })
    }

    fetchProducts = async () => {
        await this.setState({ data: await ProductService.fetchProduct() })
        await this.initialConfig();
    }

    fetchSubCategories = async () => this.setState({ subcategories: await CategoryService.fetchSubCategory() })

    addProduct = async () => {
        let data = { product: this.state.product, user: { user_id: 1 }}
        let product = await ProductService.addProduct(data)
        if (product) {
            await this.fetchProducts()
            await this.close();
        };
    }

    updateProduct = async () => {
        let product = await ProductService.updateProduct(this.state.product)
        if (product) {
            await this.fetchProducts()
            await this.close();
        };
    }

    uploadCSV = async () => {
        const csvFile = await document.querySelector('#upload');
        var formData = await new FormData();
        await formData.append("file", csvFile.files[0]);
        await this.setState({ loadingCSV: true });
        let response = await ProductService.uploadCSV(formData).catch(error => {
            console.log('error ', error);
        })
        await console.log(response)
        await this.setState({ loadingCSV: false });
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleFilterChange = (event) => {
        let filter = event.target.value;
        let copy = this.state.data.filter((product) => product.name.toLowerCase().includes(filter.toLowerCase()))
        let pages = (filter) ? copy.length : this.state.data.length;
        let actualview = copy.slice(this.state.page*this.state.rowsPerPage, (this.state.page*this.state.rowsPerPage) + this.state.rowsPerPage);
        this.setState({ filter, copy, actualview, pages, page: 0 });
    };

    handleSearchFilter = () => {
        var input = document.querySelector('.products_filter__17DT9');
        var label = document.querySelector('.products_label_input__1s12a');
        input.style.borderBottom = '0.5px solid lightgrey';
        input.style.width = '70%';
        label.style.display = 'block !important';
    }

    handleLeaveFilter = () => {
        var input = document.querySelector('.products_filter__17DT9');
        var label = document.querySelector('.products_label_input__1s12a');
        input.style.borderBottom = (this.state.filter) ? '0.5px solid lightgrey' : 0;
        input.style.width = (this.state.filter) ? '70%' : '6%';
        label.style.display = (this.state.filter) ? 'block !important' : 'none !important';
    }

    handleClearFilter = async () => {
        let copy = this.state.data;
        let pages = copy.length;
        let actualview = copy.slice(this.state.page*this.state.rowsPerPage, (this.state.page*this.state.rowsPerPage) + this.state.rowsPerPage)
        await this.setState({filter: '', copy, pages, actualview});
        await this.handleLeaveFilter();
    };

    handleChangePage = (event, page) => {
        let actualview = this.state.copy.slice(page*this.state.rowsPerPage, (page*this.state.rowsPerPage) + this.state.rowsPerPage)
        this.setState({page, actualview});
    };

    handleChangeRowsPerPage = (event) => {
        let rowsPerPage = parseInt(event.target.value, 10)
        let actualview = this.state.copy.slice(this.state.page*rowsPerPage, (this.state.page*rowsPerPage) + rowsPerPage)
        this.setState({rowsPerPage, actualview});
    };

    handleOpenMenu = (event, item) => {
        console.log(event, item);
        this.setState({menu: event.currentTarget, product: item});
    }

    handleCloseMenu = (event) => {
        this.setState({menu: null});
    }

    productInfo = (product) => {
        console.log(product);
        this.showSlide('editar', product)
    }

    showSlide = (label, new_product = null) => {
        var slide = document.querySelector('.products_form__NyT-O');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.right = '0px';
        products.style.opacity = '0.5';
        this.assignForm(label, new_product);
    }

    close = () => {
        var slide = document.querySelector('.products_form__NyT-O');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.right = '-1000px';
        products.style.opacity = '1';
    }

    assignForm = (label, newProduct=null) => {
        this.setState((prevState) => {
            let button = label;
            let product = newProduct ? this.state.product : { code:'', codebar:'', name: '', price: '', freeze: false, tax: false, recipe: false, regulated: false, rating:0, replacementClassification: '', labProviderName: '', subcategory_id: '' };
            return { button, product, menu: null };
        })
    }

    slideCSV = () => {
        var slide = document.querySelector('.products_upload_sale__3iQjU');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.top = '30%';
        products.style.opacity = '0.5';
    }

    closeCSV = () => {
        var slide = document.querySelector('.products_upload_sale__3iQjU');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.top = '-30%';
        products.style.opacity = '1';
    }

    viewSlide = () => {
        var slide = document.querySelector('.products_view__2a2KS');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.top = '20%';
        products.style.opacity = '0.5';
        this.setState((prevState) => { return { menu: null }; })
    }

    viewClose = () => {
        var slide = document.querySelector('.products_view__2a2KS');
        var products = document.querySelector('.products_products__1eM3g');
        slide.style.top = '100%';
        products.style.opacity = '1';
    }

    handleCode = (code) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.code = code;
            return { product };
        })
    }

    handleCodebar = (codebar) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.codebar = codebar;
            return { product };
        })
    }

    handleName = (name) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.name = name;
            return { product };
        })
    }

    handlePrice = (price) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.price = price;
            return { product };
        })
    }

    handleFreeze = (freeze) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            //product.freeze = (freeze === 'true') ? true : false;
            product.freeze = Number(freeze);
            return { product };
        })
    }

    handleTax = (tax) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            //product.tax = (tax === 'true') ? true : false;
            product.tax = Number(tax);
            return { product };
        })
    }

    handleRecipe = (recipe) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            //product.recipe = (recipe === 'true') ? true : false;
            product.recipe = Number(recipe);
            return { product };
        })
    }

    handleRegulated = (regulated) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            //product.regulated = (regulated === 'true') ? true : false;
            product.regulated = Number(regulated);
            return { product };
        })
    }

    handleRating = (rate) => {
        console.log(rate);
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.rating = (rate) ? rate : 0;
            return { product };
        })
    }

    handleClasification = (clasification) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.replacementClassification = Number(clasification);
            return { product };
        })
    }

    handleLabProviderName = (name) => {
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.labProviderName = name;
            return { product };
        })
    }

    handleSubcategoryId = (id) => {
        console.log(id);
        this.setState((prevState) => {
            let product = Object.assign({}, prevState.product);
            product.subcategory_id = id;
            return { product };
        })
    }

    render = () => {
        return (
            <div className={styles.page}>
                <div className={styles.products}>
                    { (!this.state.loading) ? <div className={styles.nav}>
                        <div className={styles.button}>
                            <Button variant="contained" color="primary" className={styles.add} onClick={() => this.showSlide('agregar')}>Agregar</Button>
                            &nbsp;&nbsp;
                            <Button variant="contained" color="primary" className={styles.add} onClick={() => this.slideCSV()}>Subir CSV</Button>
                        </div>
                        <div className={styles.input}>
                            <FormControl className={styles.search}>
                                <InputLabel htmlFor="" className={styles.label_input}>Buscar</InputLabel>
                                <Input
                                    className={styles.filter}
                                    value={this.state.filter}
                                    onChange={this.handleFilterChange}
                                    onBlur={this.handleLeaveFilter}
                                    startAdornment={
                                    <InputAdornment position='start'>
                                        { (this.state.filter === '') ? <IconButton
                                        aria-label=''
                                        onClick={this.handleSearchFilter}
                                        ><Search /> </IconButton> : 
                                        <IconButton
                                        aria-label=''
                                        onClick={this.handleClearFilter}
                                        ><Clear /></IconButton> }
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>
                    </div> : null}
                    
                    <Grid container justify='space-evenly' className={styles.boxes}>
                    {(this.state.loading ? Array.from(new Array(12)) : this.state.actualview).map((item, index) => (
                        <Box key={index} width={260} marginRight={1} my={0.5}>
                        {item ? (
                            <img style={{ width: 260, height: 145 }} alt={item.name} src={notFound} />
                        ) : (
                            <Skeleton variant="rect" width={260} height={145} />
                        )}

                        {item ? (
                            <Box pr={2}>
                                <Typography gutterBottom variant="body1" >
                                    {/* {index} {item.title} */}
                                    {item.name}
                                </Typography>
                                <Typography display="block" variant="body2" color="textSecondary">
                                    {/* {item.channel} */}
                                    Precio: $ {item.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {/* {`${item.views} • ${item.createdAt}`} */}
                                    <Rating name="read-only" value={item.rating} readOnly />
                                    <IconButton aria-label="more" aria-controls="menu" aria-haspopup="true" onClick={(event) => this.handleOpenMenu(event, item)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu key={index} anchorEl={this.state.menu} keepMounted open={Boolean(this.state.menu)} onClose={this.handleCloseMenu} 
                                        PaperProps={{ 
                                            style: { maxHeight: 48 * 4.5, width: '15ch', boxShadow: '0px 0 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 2px 5px 0px rgb(0 0 0 / 3%)'}
                                        }}>
                                        <MenuItem onClick={() => this.viewSlide()}>Ver</MenuItem>
                                        <MenuItem onClick={() => this.showSlide('editar', 1)}>Editar</MenuItem>
                                        <MenuItem>Eliminar</MenuItem>
                                    </Menu>
                                </Typography>
                            </Box>
                        ) : (
                            <Box pt={0.5}>
                            <Skeleton />
                            <Skeleton width="60%" />
                            </Box>
                        )}
                        </Box>
                    ))}
                    </Grid>
                    {(!this.state.loading ? 
                    <TablePagination
                        className={styles.pagination}
                        component="div"
                        count={this.state.pages}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        rowsPerPageOptions={[]}
                        rowsPerPage={this.state.rowsPerPage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    : undefined)}
                </div>

                <div className={styles.form}>
                    <div className={styles.header}>
                        <Clear onClick={this.close}/>
                        <span className={styles.title}> {this.state.button} Producto</span>
                    </div>
                    <div className={styles.content}>
                        <ProductFormComponent label={this.state.button} 
                            add={this.addProduct} update={this.updateProduct}
                            product={this.state.product} subcategories={this.state.subcategories}
                            handleCode={this.handleCode} handleCodebar={this.handleCodebar}
                            handleName={this.handleName} handlePrice={this.handlePrice}
                            handleFreeze={this.handleFreeze} handleTax={this.handleTax}
                            handleRecipe={this.handleRecipe} handleRegulated={this.handleRegulated} handleRating={this.handleRating}
                            handleClasification={this.handleClasification} handleLabProviderName={this.handleLabProviderName}
                            handleSubcategoryId={this.handleSubcategoryId}
                        />
                    </div>
                </div>

                <div className={styles.upload_sale}>
                    <div className={styles.upload_header}>
                        <span className={styles.upload_title}>Subir Archivo CSV (Productos/Ventas)</span>
                        <Clear onClick={this.closeCSV}/>
                    </div>
                    <div className={styles.upload_content}>
                        { (!this.state.loadingCSV) ? 
                        <div>
                            <p style={{width: '90%', marginLeft: '5%'}}>Subir archivo .csv para agregar las ventas de un mes, así como los productos que no se encuentren registrados actualmente.</p>
                            <input id='upload' className={styles.upload_input} type="file" accept=".csv"/>
                            <div className={styles.upload_buttons}>
                                <Button variant="contained" color='secondary' className={styles.upload_button} onClick={this.uploadCSV}>upload</Button>
                            </div>
                        </div> :
                        <CircularProgress color="secondary" /> }
                    </div>
                </div>
                
                <div className={styles.view}>
                    <div className={styles.view_header}>
                        <span className={styles.view_title}> Información Producto: {this.state.product.name} </span>
                        <Clear onClick={this.viewClose}/>
                    </div>
                    <div className={styles.view_content}>
                        <Grid container justify="flex-start">
                            <Box style={{ width: '100%' }} marginLeft={4} my={0}>
                                <div style={{ display: 'flex' }} >
                                    <img style={{ width: 300, height: 175 }} alt={this.state.product.name} src={notFound} />
                                    <span> 
                                        <div className={styles.view_text}>Nombre: {this.state.product.name}</div>
                                        <div className={styles.view_text}>Nombre del Laboratorio/Proveedor: {this.state.product.labProviderName}</div>
                                        <div className={styles.view_text}>Precio $: {this.state.product.price}</div>
                                        <div className={styles.view_text}>Precio Bs: {this.state.product.price}</div>
                                        <div className={styles.view_text}><Rating name="read-only" value={this.state.product.rating} readOnly /></div>
                                    </span>
                                </div>
                                <div>
                                    <Chip className={styles.chip} color="primary" label={(this.state.product.freeze===1)?'Refrigerado':'No Refrigerado'} icon={<AcUnit />} />
                                    <Chip className={styles.chip} color="primary" label={(this.state.product.regulated===1)?'Regulado':'No Regulado'} icon={<LocalMall />} />
                                    <Chip className={styles.chip} color="primary" label={(this.state.product.tax===1)?'Libre de Impuestos':'No es Libre de Impuestos'} icon={<MonetizationOnIcon />} />
                                    <Chip className={styles.chip} color="primary" label={(this.state.product.recipe===1)?'Con Recipe':'Sin Recipe'} icon={<Receipt />} />
                                    <Chip className={styles.chip} color="primary" label={(this.state.product.replacementClassification===1) ? 'Clasificación A' : (this.state.product.replacementClassification===2) ? 'Clasificación B' : 'Clasificación C'} icon={<LocalOffer />} />
                                </div>

                                <BarCode value={this.state.product.codebar} />
                                
                                {/* <Typography display="block" variant="body2" color="textSecondary"> */}
                                    {/* {item.channel} */}
                                {/*     Precio: $ {item.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary"> */}
                                    {/* {`${item.views} • ${item.createdAt}`} */}
                                {/*     <Rating name="read-only" value={item.rating} readOnly />
                                    <IconButton aria-label="more" aria-controls="menu" aria-haspopup="true" onClick={(event) => this.handleOpenMenu(event, item)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu key={index} anchorEl={this.state.menu} keepMounted open={Boolean(this.state.menu)} onClose={this.handleCloseMenu} 
                                        PaperProps={{ 
                                            style: { maxHeight: 48 * 4.5, width: '15ch', boxShadow: '0px 0 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 2px 5px 0px rgb(0 0 0 / 3%)'}
                                        }}>
                                        <MenuItem onClick={() => this.viewSlide()}>Ver</MenuItem>
                                        <MenuItem onClick={() => this.showSlide('editar', 1)}>Editar</MenuItem>
                                        <MenuItem>Eliminar</MenuItem>
                                    </Menu>
                                </Typography> */}
                            </Box>
                        </Grid>
                    </div>
                </div>
            </div>
        );
    }

}

export default ProductComponent;
