import React from 'react';
import styles from './category.module.css';
import { Add, Edit } from '@material-ui/icons'
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent'

class CategoryComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            headersCategory: [
                { title: "Nombre", field: "name" }
            ],
            headersSubCategory: [
                { title: "Nombre", field: "name" }
            ],
            actionsCategory: [
                {
                    icon: Add,
                    tooltip: 'Agregar Categoria',
                    isFreeAction: true,
                    onClick: (event) => alert("You want to add a new row")
                },
                {
                    icon: Edit,
                    tooltip: 'Editar',
                    onClick: (event, rowData) => this.showForm('Editar', rowData)
                }
            ],
            actionsSubCategory: [
                {
                    icon: Add,
                    tooltip: 'Agregar SubCategoria',
                    isFreeAction: true,
                    onClick: (event) => alert("You want to add a new row")
                },
                {
                    icon: Edit,
                    tooltip: 'Editar',
                    onClick: (event, rowData) => this.showForm('Editar', rowData)
                }
            ],
            categories: [],
            subcategories: [],
            category: null,
            subcategory: null,
            form: false,
            button: 'Agregar'
        }
    }

    render = () => {
        return (
            <div className={styles.container}>
                <div className={styles.table}>
                    <TableResponsiveComponent title='Categorias' headers={this.state.headersCategory} actions={this.state.actionsCategory} data={this.state.categories} showForm={this.showForm} />
                </div>
                <div className={styles.table}>
                    <TableResponsiveComponent title='Subcategorias' headers={this.state.headersSubCategory} actions={this.state.actionsSubCategory} data={this.state.subcategories} showForm={this.showForm} />
                </div>
            </div>
        );
    }

}

export default CategoryComponent;
