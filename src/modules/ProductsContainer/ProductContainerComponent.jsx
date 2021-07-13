import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './productcontainer.module.css';
import CategoryComponent from '../Category/CategoryComponent';
import ProductComponent from '../Products/ProductsComponent';

class ProductContainerComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 0,
      file: ''
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render = () => {
    return (
        <div>
          <Tabs
            className={styles.root}
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Categoria | Subcategoria" value={0}/>
            <Tab label="Productos" value={1}/>
            {/* <Tab label="Comparaciones" value={2}/> */}
          </Tabs>
          {(this.state.value===0) ? <CategoryComponent/> : /* (this.state.value===1) ? */ <ProductComponent/> /* : <div>TAB 3</div> */}
        </div>
    );
  }

}

export default ProductContainerComponent;
