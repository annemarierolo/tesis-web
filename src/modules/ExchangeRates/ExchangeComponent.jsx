import React from 'react';
import styles from './exchange.module.css'

class ExchangeComponent extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render = () => {
    return (
        <div className={styles.page}>
            <h1>Exchange Component!</h1>
        </div>
    );
  }

}

export default ExchangeComponent;
