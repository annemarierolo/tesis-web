import React from 'react';
import styles from './exchange.module.css'
import { Edit, Clear } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Button, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, TextField } from '@material-ui/core/';
import TableResponsiveComponent from '../../library/common/TableResponsive/TableResponsiveComponent'
import ExchangeService from '../../main/services/Exchange/ExchangeService';
import LineGraph from '../../library/common/Charts/LineGraph';
import ExchangeFormComponent from './ExchangeForm/ExchangeFormComponent';
import Alerts from '../../library/common/Alerts/Alert';

class ExchangeComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      headers: [
        { title: 'Id', field: 'id'/* , defaultSort: 'desc' */, hidden: true },
        { title: "Fecha", field: "date", defaultSort: 'desc' },
        { title: 'Hora', field: 'time' },
        { title: "Precio", field: "amount" }
      ],
      actions: [
        rowData => ({
          icon: Edit,
          tooltip: 'editar',
          onClick: (event, rowData) => this.checkBeforeUpdate('editar', rowData),
          /*hidden: ((new Date(rowData.date).getUTCDate() !== new Date().getDate()) && (new Date(rowData.date).getMonth() !== new Date().getMonth()) && (new Date(rowData.date).getFullYear() !== new Date().getFullYear()))*/
          /* hidden: (String(new Date().getUTCMonth()).length===1) ? rowData.date !== `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : rowData.date !== `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` */
          /* hidden: (this.state.lastDate) ? (rowData.datetime !== this.state.lastDate.toUTCString()) : null */
          hidden: (this.state.lastDate2) ? (rowData.datetime !== this.state.lastDate2.datetime) : null
        })
      ],
      exchanges: [],
      fifteenExchanges: [],
      fifteenAmounts: [],
      exchange:  { date: null, amount: '' },
      lastDate: null,
      lastDate2: null,
      bcv: null,
      dToday: null,
      form: false,
      button: 'agregar',
      parameter: {
        frecuency: 0,
        value: 1
      },
      table: true,
      activeParameter: true
    }
  }

  componentDidMount() {
    /* this.lastD(); */
    this.fetchExchanges();
    this.getDolars();
    this.getParameter();
    this.getActiveParameter();
    
  }

  lastDate = () => new Date(Math.max.apply(null, this.state.exchanges.map(function (e) {
    return new Date(e.datetime);
  })));

  lastD = async () => {
    this.setState( { lastDate2: await ExchangeService.lastExchange() })
  }

  fetchExchanges = async () => {
    await this.setState({ exchanges: await ExchangeService.fetchData().catch(() => Alerts.alertBar('Error Obteniendo Tipos de Cambio', 'error')), table: true })
    let lastItems = (this.state.exchanges !== undefined) ? await this.state.exchanges.slice(this.state.exchanges.length - 15) : null
    await this.setState( { lastDate2: lastItems[14] })
    if (this.state.exchanges !== undefined) {
      await this.setState({ lastDate: await this.lastDate() });
      await this.setState({ fifteenExchanges: lastItems.map(a => a.date) })
      await this.setState({ fifteenAmounts: lastItems.map(a => a.amount) })
    }
    /* console.log((String(new Date().getUTCMonth()).length===1) ? `${String(new Date().getFullYear())}-0${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}` : `${String(new Date().getFullYear())}-${String(new Date().getUTCMonth()+1)}-${String(new Date().getDate())}`)
    let timestamp= new Date().getTime();
    console.log(new Date());
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getUTCDate() === new Date().getDate())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getMonth() === new Date().getMonth())
    console.log(new Date("Wed, 17 Feb 2021 00:00:00 GMT").getFullYear() === new Date().getFullYear())
    await console.log(this.state.exchanges);
    await console.log(this.state.exchanges.length > 0); */
  }

  getActiveParameter = async () => {
    let parameter = true;
    await ExchangeService.getParameter().then(res => parameter = res)
    this.setState({activeParameter: parameter})
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
    .catch(() => Alerts.alertBar('Error Agregando Tipo de Cambio', 'error'))
    if (exchage) {
      Alerts.alertBar('Tipo de Cambio Agregado Exitosamente', 'success')
      await this.getActiveParameter()
      await this.fetchExchanges()
      await this.close();
    };
  }

  updateExchange = async () => {
    let exchange = this.state.exchange
    delete exchange.datetime;
    delete exchange.time;
    exchange.date = new Date();
    let update = await ExchangeService.updateExchange(exchange)
    .catch(() => Alerts.alertBar('Error Modificando Tipo de Cambio', 'error'))
    if (update) {
      Alerts.alertBar('Tipo de Cambio Modificado Exitosamente', 'success')
      this.setState({table: false})
      await this.fetchExchanges()
      await this.close()
    };
  }

  getParameter = async () => {
    let parameter = await ExchangeService.fetchParameter()
    this.setState({parameter: parameter})
  }

  updateParameter = async () => {
    if (Number(this.state.parameter.frecuency) !== 0)
      this.setState((prevState) => {
        let parameter = Object.assign({}, prevState.parameter);
        parameter.value = 1;
        return { parameter };
      })
    let parameter = await ExchangeService.updateParameter(this.state.parameter)
    .catch(() => Alerts.alertBar('Error Modificando Parámetro', 'error'))
    if (parameter) {
      Alerts.alertBar('Parámetro Modificado Exitosamente', 'success')
      this.closeParameter();
    }
  }

  checkBeforeUpdate = (label, newExchange = null) => {
    console.log(newExchange);
    if (this.state.activeParameter) this.showSlide(newExchange, label)
    else Alerts.simpleDesitionAlert('No ha concluido el plazo del parámetro. ¿Esta seguro que desea editar?', newExchange, this.showSlide)
  }

  showSlide = (newExchange = null, label = 'editar') => {
    console.log(newExchange);
    var slide = document.querySelector('.exchange_form__3Frov');
    /* var tables = document.querySelector('.exchange_tables__1IRte'); */
    var blocked = document.querySelector('.exchange_blocked__1fB5E');
    slide.style.right = '0px';
    /* tables.style.opacity = '0.5'; */
    blocked.style.display = 'block';
    this.assignForm(label, newExchange);
  }

  slideParameter = () => {
    var slide = document.querySelector('.exchange_parameter_modal__2cI3U');
    /* var products = document.querySelector('.exchange_tables__1IRte'); */
    var blocked = document.querySelector('.exchange_blocked__1fB5E');
    slide.style.top = '30%';
    /* products.style.opacity = '0.5'; */
    blocked.style.display = 'block';
  }

  closeParameter = () => {
    var slide = document.querySelector('.exchange_parameter_modal__2cI3U');
    var products = document.querySelector('.exchange_tables__1IRte');
    var blocked = document.querySelector('.exchange_blocked__1fB5E');
    slide.style.top = '-35%';
    products.style.opacity = '1';
    blocked.style.display = 'none';
  }

  close = () => {
    var slide = document.querySelector('.exchange_form__3Frov');
    var tables = document.querySelector('.exchange_tables__1IRte');
    var blocked = document.querySelector('.exchange_blocked__1fB5E');
    slide.style.right = '-1000px';
    tables.style.opacity = '1';
    blocked.style.display = 'none';
  }

  assignForm = (label, newExchange = null) => {
    console.log(newExchange);
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

  handleFrecuency = (frecuency) => {
    this.setState((prevState) => {
      let parameter = Object.assign({}, prevState.parameter);
      parameter.frecuency = Number(frecuency);
      return { parameter };
    })
  }

  handleValue = (value) => {
    this.setState((prevState) => {
      let parameter = Object.assign({}, prevState.parameter);
      parameter.value = value;
      return { parameter };
    })
  }

  render = () => {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.blocked}></div>
          <div className={styles.tables}>
            { (this.state.activeParameter) ? 
              <Alert className={styles.alert} severity="warning">Concluyó el plazo del parámetro. Debe incluir un tipo de cambio!</Alert> : 
              <Alert className={styles.alert} severity="warning">No ha concluido el plazo del parámetro!</Alert> 
            }
            <div className={styles.parameter}>
              <Button variant="contained" color="primary" className={styles.add} onClick={() => this.slideParameter()}>Parámetros</Button>
            </div>
            <div>
              {this.state.fifteenAmounts.length > 0 ?
                <div className={styles.graph}>
                  <LineGraph labels={this.state.fifteenExchanges} label='Últimos 15 Tipos de Cambio' data={this.state.fifteenAmounts} />
                </div>
                : null}
              <div className={styles.table}>
                { (this.state.table) && <TableResponsiveComponent title='Tipo de Cambio' headers={this.state.headers} actions={this.state.actions} data={this.state.exchanges} showForm={this.showForm} /> }
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

          <div className={styles.parameter_modal}>
            <div className={styles.parameter_header}>
                <span className={styles.parameter_title}>Parámetros</span>
                <Clear onClick={this.closeParameter}/>
            </div>
            <div className={styles.parameter_content}>
              <FormControl component="fieldset" className={styles.input}>
                <FormLabel component="legend">Frecuencia</FormLabel>
                <RadioGroup row aria-label="" name="frecuency" value={this.state.parameter.frecuency} onChange={(event) => this.handleFrecuency(event.target.value)}>
                    <FormControlLabel value={0} control={<Radio />} label="Horas" />
                    <FormControlLabel value={1} control={<Radio />} label="Diariamente" />
                    <FormControlLabel value={2} control={<Radio />} label="Semanalmente" />
                </RadioGroup>
              </FormControl>
              {(this.state.parameter.frecuency === 0) && 
                <TextField className={styles.parameter_input} id="outlined-basic" label="¿Cada Cuantas Horas?" variant="outlined"
                  value={this.state.parameter.value} onChange={(event) => { if (!isNaN(event.nativeEvent.data) && event.target.value.length <= 5) this.handleValue(event.target.value)}}/>}
              <div className={styles.parameter_buttons}>
                <Button variant="contained" color='primary' className={styles.parameter_button} onClick={() => this.updateParameter()}>Actualizar</Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          { (this.state.activeParameter) && <Button variant="contained" color='primary' className={styles.button} onClick={() => this.showSlide(null, 'agregar')}>+</Button> }
        </div>
      </div>
    );
  }

}

export default ExchangeComponent;
