import React from 'react';
import styles from './exchange.module.css'
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent'
import ExchangeService from '../../main/services/Exchange/ExchangeService';
import LineGraph from '../../library/common/Charts/LineGraph';
import ExchangeFormComponent from './ExchangeForm/ExchangeFormComponent';

class ExchangeComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        { title: "Fecha", field: "date" },
        { title: "Precio", field: "amount" }
      ],
      actions: [
        rowData => ({
          icon: Edit,
          tooltip: 'Editar',
          onClick: (event, rowData) => this.showForm('Editar', rowData),
          /*hidden: ((new Date(rowData.date).getUTCDate() !== new Date().getDate()) && (new Date(rowData.date).getMonth() !== new Date().getMonth()) && (new Date(rowData.date).getFullYear() !== new Date().getFullYear()))*/
          hidden: (String(new Date().getUTCMonth()).length===1) ? rowData.date !== `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : rowData.date !== `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}`
        })
      ],
      exchanges: [],
      thirtyDays: [],
      thirtyAmounts: [],
      exchange: null,
      bcv: null,
      dToday: null,
      form: false,
      button: 'Agregar'
    }
  }

  componentDidMount() {
    this.fetchExchanges();
    this.getDolars();
  }

  fetchExchanges = async () => {
    this.setState({ exchanges: await ExchangeService.fetchData() })
    let lastItems = await this.state.exchanges.slice(this.state.exchanges.length - 5)
    this.setState({ thirtyDays: lastItems.map(a => a.date) })
    this.setState({ thirtyAmounts: lastItems.map(a => a.amount) })
    console.log((String(new Date().getUTCMonth()).length===1) ? `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}`)
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getUTCDate() === new Date().getDate())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getMonth() === new Date().getMonth())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getFullYear() === new Date().getFullYear())
    await console.log(this.state.exchanges);
    await console.log(this.state.exchanges.length > 0);
  }

  getDolars = async () => {
    let dolar = await ExchangeService.getDolars();
    await console.log(dolar);
    this.setState({
      bcv: await dolar.sicad2,
      dToday: await dolar.dolartoday
    })
  }

  addExchange = async () => {
    let exchage = await ExchangeService.addExchange({exchange: this.state.exchange, user: {user_id: 1}})
    if (exchage) {
      await this.fetchExchanges()
      await this.showForm('Agregar')
    };
  }

  updateExchange = async () => {
    let exchage = await ExchangeService.updateExchange(this.state.exchange)
    if (exchage) {
      await this.fetchExchanges()
      await this.showForm('Agregar')
    }; 
  }

  showForm = (label, newExchange = null) => {
    this.setState((prevState) => {
      let form = !prevState.form;
      let button = label;
      let exchange = newExchange ? newExchange : { date: null, amount: '' };
      return { form, button, exchange };
    })
  }

  handleDolar = async (value, action=null) => {
    await this.setState((prevState) => {
      let exchange = Object.assign({}, prevState.exchange);
      exchange.amount = value;
      if (exchange.date === null) exchange.date = new Date();
      return { exchange };
    })
    if(action==='add') this.addExchange(); else if(action==='edit') this.updateExchange()
  }

  render = () => {
    return (
      <div>
        <div className={styles.container}>
          {!this.state.form ?
            <div>
              {this.state.thirtyAmounts.length > 0 ?
                <div className={styles.graph}>
                  <LineGraph labels={this.state.thirtyDays} label='Últimos 30 días' data={this.state.thirtyAmounts} />
                </div>
                : null}
              <div className={styles.table}>
                <TableResponsiveComponent title='Tipo de Cambio' headers={this.state.headers} actions={this.state.actions} data={this.state.exchanges} showForm={this.showForm} />
              </div>
            </div>
            : <ExchangeFormComponent
              label={this.state.button}
              exchange={this.state.exchange}
              bcv={this.state.bcv}
              dToday={this.state.dToday}
              hideForm={this.showForm}
              handleDolar={this.handleDolar}
              addExchange={this.addExchange}
              updateExchange={this.updateExchange}
            />}
        </div>
        <div>
          {!this.state.form ? <Button variant="contained" color='primary' className={styles.button} onClick={() => this.showForm('Agregar')}>+</Button> : undefined}
        </div>
      </div>
    );
  }

}

export default ExchangeComponent;
