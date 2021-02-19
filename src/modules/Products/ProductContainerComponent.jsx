import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import styles from './productcontainer.module.css';
import CategoryComponent from '../Category/CategoryComponent';

class ProductComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      value: 0
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
            fullWidth
          >
            <Tab label="Categoria | Subcategoria" value={0}/>
            <Tab label="Productos" value={1}/>
            <Tab label="Comparaciones" value={2}/>
          </Tabs>
          {(this.state.value===0) ? <CategoryComponent/> : (this.state.value===1) ? <div>Tab 2</div> : <div>Tab 3</div>}
        </div>
    );
  }

}

export default ProductComponent;
