import React from 'react';
import styles from './category.module.css';
import { Add, Edit, Clear } from '@material-ui/icons'
import Alerts from '../../library/common/Alerts/Alert';
import CategoryFormComponent from './CategoryForm/CategoryFormComponent';
import CategoryService from '../../main/services/Category/CategoryService';
import SubCategoryFormComponent from './SubCategoryForm/SubCategoryFormComponent';
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent'

class CategoryComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            headersCategory: [
                { title: "Nombre", field: "name" }
            ],
            headersSubCategory: [
                { title: "Nombre", field: "name" },
                { title: "Categoria", field: "category" }
            ],
            actionsCategory: [
                {
                    icon: Add,
                    tooltip: 'Agregar Categoria',
                    isFreeAction: true,
                    onClick: (event) => this.showSlide('agregar', true)
                },
                {
                    icon: Edit,
                    tooltip: 'Editar',
                    onClick: (event, rowData) => this.showSlide('editar', true, rowData)
                }
            ],
            actionsSubCategory: [
                {
                    icon: Add,
                    tooltip: 'Agregar SubCategoria',
                    isFreeAction: true,
                    onClick: (event) => this.showSlide('agregar', false)
                },
                {
                    icon: Edit,
                    tooltip: 'Editar',
                    onClick: (event, rowData) => this.showSlide('Editar', false, null, rowData)
                }
            ],
            slide: false,
            group: 'category_id',
            categories: [],
            subcategories: [],
            category: { name: '' },
            subcategory: { name: '', category_id: '' },
            formCategory: false,
            formSubCategory: false,
            buttonCategory: 'agregar',
            buttonSubCategory: 'agregar',
            tables: true
        }
    }

    componentDidMount() {
        this.fetchCategories();
        this.fetchSubCategories();
    }

    fetchCategories = async () => this.setState({ categories: await CategoryService.fetchCategory().catch(() => Alerts.alertBar('Error Obteniendo Información', 'error')), tables: true })

    addCategory = async () => {
        let category = await CategoryService.addCategory(this.state.category)
        .catch(() => Alerts.alertBar('Error Agregando Categoria', 'error'))
        if (category) {
            Alerts.alertBar('Categoria Agregada Exitosamente', 'success')
            await this.fetchCategories()
            await this.close();
        };
    }

    updateCategory = async () => {
        let category = await CategoryService.updateCategory(this.state.category)
        .catch(() => Alerts.alertBar('Error Modificando Categoria', 'error'))
        if (category) {
            this.setState({tables: false})
            Alerts.alertBar('Categoria Modificada Exitosamente', 'success')
            await this.fetchCategories()
            await this.fetchSubCategories()
            await this.close();
        };
    }

    fetchSubCategories = async () => this.setState({ subcategories: await CategoryService.fetchSubCategory().catch(() => Alerts.alertBar('Error Obteniendo Información', 'error')), tables: true })

    addSubCategory = async () => {
        let subcategory = await CategoryService.addSubCategory(this.state.subcategory)
        .catch(() => Alerts.alertBar('Error Agregando SubCategoria', 'error'))
        if (subcategory) {
            Alerts.alertBar('SubCategoria Agregada Exitosamente', 'success')
            await this.fetchSubCategories()
            await this.close();
        };
    }

    updateSubCategory = async () => {
        let subcategory = await CategoryService.updateSubCategory(this.state.subcategory)
        .catch(() => Alerts.alertBar('Error Modificando SubCategoria', 'error'))
        if (subcategory) {
            this.setState({tables: false})
            Alerts.alertBar('SubCategoria Modificada Exitosamente', 'success')
            await this.fetchSubCategories()
            await this.close();
        };
    }

    showSlide = (label, form, new_category = null, new_subcategory = null) => {
        var slide = document.querySelector('.category_form__3rj7L');
        /* var tables = document.querySelector('.category_tables__3lEDr'); */
        var blocked = document.querySelector('.category_blocked__1cH5N');
        slide.style.right = '0px';
        /* tables.style.opacity = '0.5'; */
        blocked.style.display = 'block';
        this.assignForm(label,form, new_category, new_subcategory);
    }

    assignForm = (label, form, new_category, new_subcategory) => {
        this.setState((prevState) => { 
            let buttonCategory = label;
            let buttonSubCategory = label;
            let formCategory = (form) ? true : false;
            let formSubCategory = (form) ? false : true;
            let category = new_category ? new_category : { name: '' };
            let subcategory = new_subcategory ? new_subcategory : { name: '', category_id: '' };
            return { formCategory, formSubCategory, buttonCategory, buttonSubCategory, category, subcategory }; })
    }

    close = () => {
        var slide = document.querySelector('.category_form__3rj7L');
        var tables = document.querySelector('.category_tables__3lEDr');
        var blocked = document.querySelector('.category_blocked__1cH5N');
        slide.style.right = '-1000px';
        tables.style.opacity = '1';
        blocked.style.display = 'none';
        this.setState((prevState) => { let slide = !prevState.slide; let formCategory = false; let formSubCategory = false; return { slide, formCategory, formSubCategory }; })
    }

    handleCategoryName = (name) => {
        this.setState((prevState) => {
            let category = Object.assign({}, prevState.category);
            category.name = name;
            return { category };
        })
    }

    handleSubCategoryName = (name) => {
        this.setState((prevState) => {
            let subcategory = Object.assign({}, prevState.subcategory);
            subcategory.name = name;
            return { subcategory };
        })
    }

    handleCategoryId = (category_id) => {
        this.setState((prevState) => {
            let subcategory = Object.assign({}, prevState.subcategory);
            subcategory.category_id = category_id;
            return { subcategory };
        })
    }

    render = () => {
        return (
            <div className={styles.container}>
                <div className={styles.blocked}></div>
                <div className={styles.tables}>
                    <div className={styles.table}>
                        { (this.state.tables) && <TableResponsiveComponent title='Categorias' headers={this.state.headersCategory} actions={this.state.actionsCategory} data={this.state.categories} /> }
                    </div>
                    <div className={styles.table}>
                        { (this.state.tables) && <TableResponsiveComponent title='Subcategorias' headers={this.state.headersSubCategory} actions={this.state.actionsSubCategory} data={this.state.subcategories} />}
                    </div>
                </div>

                <div className={styles.form}>
                    <div className={styles.header}>
                        <Clear onClick={this.close}/>
                        <span className={styles.title}> {(!this.state.formCategory && this.state.formSubCategory) ? `${this.state.buttonSubCategory} Subcategoria` : `${this.state.buttonCategory} Categoria` } </span>
                    </div>
                    <div className={styles.content}>
                        {
                        (!this.state.formCategory && this.state.formSubCategory) ? 
                        <SubCategoryFormComponent label={this.state.buttonSubCategory} subcategory={this.state.subcategory} categories={this.state.categories} handleSubCategoryName={this.handleSubCategoryName} handleCategoryId={this.handleCategoryId} add={this.addSubCategory} update={this.updateSubCategory} /> 
                        : <CategoryFormComponent label={this.state.buttonCategory} category={this.state.category} handleCategoryName={this.handleCategoryName} add={this.addCategory} update={this.updateCategory} /> }
                    </div>
                </div>
            </div>
        );
    }

}

export default CategoryComponent;
