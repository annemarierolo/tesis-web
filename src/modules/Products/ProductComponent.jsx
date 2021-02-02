import React from 'react';
import styles from './product.module.css'

class ProductComponent extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render = () => {
    return (
        <div className={styles.page}>
            <h1>Products Component!</h1>
        </div>
    );
  }

}

export default ProductComponent;
