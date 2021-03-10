import React from 'react';
import styles from './exchange.module.css'
import { Edit, Clear } from '@material-ui/icons';
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
        { title: 'Id', field: 'id', defaultSort: 'desc', hidden: true },
        { title: "Fecha", field: "date" },
        { title: 'Hora', field: 'time' },
        { title: "Precio", field: "amount" }
      ],
      actions: [
        rowData => ({
          icon: Edit,
          tooltip: 'editar',
          onClick: (event, rowData) => this.showSlide('editar', rowData),
          /*hidden: ((new Date(rowData.date).getUTCDate() !== new Date().getDate()) && (new Date(rowData.date).getMonth() !== new Date().getMonth()) && (new Date(rowData.date).getFullYear() !== new Date().getFullYear()))*/
          /* hidden: (String(new Date().getUTCMonth()).length===1) ? rowData.date !== `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : rowData.date !== `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` */
          hidden: (this.state.lastDate) ? (rowData.datetime !== this.state.lastDate.toUTCString()) : null
        })
      ],
      exchanges: [],
      thirtyDays: [],
      thirtyAmounts: [],
      exchange:  { date: null, amount: '' },
      lastDate: null,
      bcv: null,
      dToday: null,
      form: false,
      button: 'agregar'
    }
  }

  componentDidMount() {
    this.fetchExchanges();
    this.getDolars();
  }

  lastDate = () => new Date(Math.max.apply(null, this.state.exchanges.map(function (e) {
    return new Date(e.datetime);
  })));

  fetchExchanges = async () => {
    await this.setState({ exchanges: await ExchangeService.fetchData() })
    let lastItems = await this.state.exchanges.slice(this.state.exchanges.length - 5)
    await this.setState({ lastDate: await this.lastDate() });
    await this.setState({ thirtyDays: lastItems.map(a => a.date) })
    await this.setState({ thirtyAmounts: lastItems.map(a => a.amount) })
    /* console.log((String(new Date().getUTCMonth()).length===1) ? `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}`)
    let timestamp= new Date().getTime();
    console.log(new Date());
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getUTCDate() === new Date().getDate())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getMonth() === new Date().getMonth())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getFullYear() === new Date().getFullYear())
    await console.log(this.state.exchanges);
    await console.log(this.state.exchanges.length > 0); */
  }

  getDolars = async () => {
    let dolar = await ExchangeService.getDolars();
    this.setState({
      bcv: await dolar.sicad2,
      dToday: await dolar.dolartoday
    })
  }

  addExchange = async () => {
    let exchage = await ExchangeService.addExchange({ exchange: this.state.exchange, user: { user_id: 1 } })
    if (exchage) {
      await this.fetchExchanges()
      await this.close();
    };
  }

  updateExchange = async () => {
    let exchage = await ExchangeService.updateExchange(this.state.exchange)
    if (exchage) {
      await this.fetchExchanges()
      await this.close()
    };
  }

  showSlide = (label, newExchange = null) => {
        var slide = document.querySelector('.exchange_form__3Frov');
        var tables = document.querySelector('.exchange_tables__1IRte');
        slide.style.right = '0px';
        tables.style.opacity = '0.5';
        this.assignForm(label, newExchange);
    }

  close = () => {
    var slide = document.querySelector('.exchange_form__3Frov');
    var tables = document.querySelector('.exchange_tables__1IRte');
    slide.style.right = '-1000px';
    tables.style.opacity = '1';
  }

  assignForm = (label, newExchange = null) => {
    this.setState((prevState) => {
      let button = label;
      let exchange = newExchange ? newExchange : { date: null, amount: '' };
      return { button, exchange };
    })
  }

  handleDolar = async (value, action = null) => {
    await this.setState((prevState) => {
      let exchange = Object.assign({}, prevState.exchange);
      delete exchange.datetime;
      delete exchange.time;
      exchange.amount = value;
      exchange.date = new Date();
      return { exchange };
    })

    await console.log(this.state.exchange);
    if (action === 'add') this.addExchange(); else if (action === 'edit') this.updateExchange()
  }

  render = () => {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.tables}>
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
          </div>

          <div className={styles.form}>
            <div className={styles.header}>
                <Clear onClick={this.close}/>
                <span className={styles.title}> {this.state.button} Tipo de Cambio </span>
            </div>
            <div className={styles.content}>
              <ExchangeFormComponent
                label={this.state.button}
                exchange={this.state.exchange}
                bcv={this.state.bcv}
                dToday={this.state.dToday}
                hideForm={this.showForm}
                handleDolar={this.handleDolar}
                addExchange={this.addExchange}
                updateExchange={this.updateExchange}
              />
            </div>
          </div>
        </div>
        <div>
          <Button variant="contained" color='primary' className={styles.button} onClick={() => this.showSlide('agregar')}>+</Button>
        </div>
      </div>
    );
  }

}

export default ExchangeComponent;
