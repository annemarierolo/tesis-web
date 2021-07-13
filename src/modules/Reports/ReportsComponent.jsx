import React from 'react';
import styles from './reports.module.css';
import { Skeleton, Autocomplete } from '@material-ui/lab';
import Alerts from '../../library/common/Alerts/Alert';
import BarGraph from '../../library/common/Charts/BarGraph';
import PieGraph from '../../library/common/Charts/PieGraph';
import LinesGraph from '../../library/common/Charts/LinesGraph';
import LinesSellsGraph from '../../library/common/Charts/LinesSellsGraph';
import BubbleGraph from '../../library/common/Charts/BubbleGraph';
import ReportService from '../../main/services/Report/ReportService'
import { InputLabel, FormControl, Select, Box, Grid, TextField, Button } from '@material-ui/core/';

import { connect } from 'react-redux';
import * as productActions from '../../library/redux/actions/productActions'

const array = [ { name: 'rect', size: 350 }, { name: 'circle', size: 200 }, { name: 'rect', size: 350 }, { name: 'circle', size: 200 }];

class ReportsComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            topMas: true,
            topMenos: true,
            loading: {
                lBS: false,
                lWS: false,
                lBA: false,
                lWA: false,
                lPVF: false,
                lPV: false
            },
            reports: {
                bestSellers: [],
                worstSellers: [],
                bestAmounts: [],
                worstAmounts: [],
                productVariationFour: [],
                productVariation: []
            },
            inputs: {
                yearProduct: "",
                years: [],
                year: new Date().getFullYear(),
                months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                month: (new Date().getMonth() + 1)
            },
            products: [],
            product: null
        }
    }

    async componentDidMount() {
        this.getYears();
        this.fetchPredictBestSellers(new Date().getFullYear(), new Date().getMonth() + 1);
        this.fetchPredictWorstSellers(new Date().getFullYear(), new Date().getMonth() + 1);
        this.fetchPredictBestAmounts(new Date().getFullYear(), new Date().getMonth() + 1);
        this.fetchPredictWorstAmounts(new Date().getFullYear(), new Date().getMonth() + 1);
        let cont = 0;
        while (this.state.products.length === 0) {
            const { allProducts } = this.props;
            if (cont >= 8) {
                await this.props.fetchProducts();
                cont = -1
            }
            await this.fetchProducts(allProducts);
            await this.sleep(5000)
            cont += 1
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateReports = async () => {
        const actualYear = Number(new Date().getFullYear());
        const  actualMonth = Number(new Date().getMonth()) + 1;

        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading);
            loading.lBS = false; loading.lWS = false; loading.lBA = false; loading.lWA = false;
            return { loading };
        })

        if ((this.state.inputs.year >= actualYear)) {
            if (((Number(this.state.inputs.year) === actualYear) && (Number(this.state.inputs.month) >= actualMonth)) || ((Number(this.state.inputs.year) > actualYear))) { 
                await this.fetchPredictBestSellers(this.state.inputs.year, this.state.inputs.month); await this.fetchPredictWorstSellers(this.state.inputs.year, this.state.inputs.month); 
                await this.fetchPredictBestAmounts(this.state.inputs.year, this.state.inputs.month); await this.fetchPredictWorstAmounts(this.state.inputs.year, this.state.inputs.month); 
            } else { 
                await this.fetchBestSellers(this.state.inputs.year, this.state.inputs.month); await this.fetchWorstSellers(this.state.inputs.year, this.state.inputs.month);
                await this.fetchBestAmounts(this.state.inputs.year, this.state.inputs.month); await this.fetchWorstAmounts(this.state.inputs.year, this.state.inputs.month);
            }
        } else { await this.fetchBestSellers(this.state.inputs.year, this.state.inputs.month); await this.fetchWorstSellers(this.state.inputs.year, this.state.inputs.month);
            await this.fetchBestAmounts(this.state.inputs.year, this.state.inputs.month); await this.fetchWorstAmounts(this.state.inputs.year, this.state.inputs.month); 
        }
    }

    fetchProducts = async (allProducts) => await this.setState({ products:  allProducts });

    fetchBestSellers = async (year, month) => {
        const bestSellers = await ReportService.fetchBestSellers({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lBS = true;
            reports.bestSellers = (bestSellers === undefined) ? [] : bestSellers;
            return { loading, reports };
        })
    }

    fetchWorstSellers = async (year, month) => {
        const worstSellers = await ReportService.fetchWorstSellers({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lWS = true; 
            reports.worstSellers = (worstSellers === undefined) ? [] : worstSellers;
            return { loading, reports } 
        })
    }

    fetchBestAmounts = async (year, month) => {
        const bestAmounts = await ReportService.fetchBestAmounts({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lBA = true; 
            reports.bestAmounts = (bestAmounts === undefined) ? [] : bestAmounts;  
            return { loading, reports } 
        })
    }

    fetchWorstAmounts = async (year, month) => {
        const worstAmounts = await ReportService.fetchWorstAmounts({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lWA = true; 
            reports.worstAmounts = (worstAmounts === undefined) ? [] : worstAmounts;  
            return { loading, reports }
        })
    }

    fetchProductVariationFour = async () => {
        const productVariationFour = await ReportService.fetchProductVariationFour({ 'code': this.state.product.code })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lPVF = true; 
            reports.productVariationFour = productVariationFour;  
            return { loading, reports }
        })
    }

    fetchProductVariation = async () => {
        const productVariation = await ReportService.fetchProductVariation({ 'code': this.state.product.code, 'year': this.state.inputs.yearProduct })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lPV = true; 
            reports.productVariation = productVariation;  
            return { loading, reports }
        })
    }

    // Predictions

    fetchPredictBestSellers = async (year, month) => {
        const bestSellers = await ReportService.fetchPredictBestSellers({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lBS = true;
            reports.bestSellers = bestSellers;
            return { loading, reports };
        })
    }

    fetchPredictWorstSellers = async (year, month) => {
        const worstSellers = await ReportService.fetchPredictWorstSellers({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lWS = true; 
            reports.worstSellers = worstSellers;
            return { loading, reports } 
        })
    }

    fetchPredictBestAmounts = async (year, month) => {
        const bestAmounts = await ReportService.fetchPredictBestAmounts({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error')); 
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lBA = true; 
            reports.bestAmounts = bestAmounts;  
            return { loading, reports } 
        })
    }

    fetchPredictWorstAmounts = async (year, month) => {
        const worstAmounts = await ReportService.fetchPredictWorstAmounts({ 'year': year, 'month': month })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lWA = true; 
            reports.worstAmounts = worstAmounts;  
            return { loading, reports }
        })
    }

    fetchPredictProductVariation = async () => {
        const productVariation = await ReportService.fetchPredictProductVariation({ 'code': this.state.product.code, 'year': this.state.inputs.yearProduct })
        .catch(() => Alerts.alertBar('Error Obteniendo Información', 'error'));
        await this.setState((prevState) => { 
            let loading = Object.assign({}, prevState.loading); 
            let reports = Object.assign({}, prevState.reports); 
            loading.lPV = true; 
            reports.productVariation = productVariation;  
            return { loading, reports }
        })
        await console.log(this.state.reports.productVariation);
    }

    getYears = () => {
        let years = []
        const actualYear = new Date().getFullYear()
        const actualMonth = new Date().getMonth() + 1;
        const yearOptions = (actualMonth === 12) ? actualYear + 1 : actualYear;
        for (let year = 2018; year <= yearOptions; year++) { years.push(year); this.setState((prevState) => { let inputs = prevState.inputs; inputs.years = years; return { inputs } }) }
    }

    handleYear = async (year) => {
        await this.setState((prevState) => {
            let inputs = prevState.inputs;
            inputs.year = year;
            return { inputs }
        });
        await this.updateReports();
    }

    handleMonth = async (month) => {
        await this.setState((prevState) => {
            let inputs = prevState.inputs;
            inputs.month = month;
            return { inputs }
        });
        await this.updateReports();
    }

    handleProduct = async (product) => {
        await this.setState((prevState) => {
            let inputs = prevState.inputs;
            let loading = prevState.loading;
            let reports = prevState.reports;
            loading.lPVF = /* (product != null) ? loading.lPVF : */ false;
            loading.lPV = /* (product != null) ? loading.lPVF : */ false;
            inputs.yearProduct = new Date().getFullYear() - 1;
            reports.productVariationFour = [];
            reports.productVariation = [];
            return { inputs, product: product, loading, reports }
        });
        if (this.state.product != null) { await this.fetchProductVariationFour(); await this.fetchProductVariation(); }
    }

    handleProductYear = async (year) => {
        const actualYear = Number(new Date().getFullYear());
        const actualMonth = Number(new Date().getMonth());
        await this.setState((prevState) => {
            let inputs = prevState.inputs;
            let loading = prevState.loading;
            loading.lPV = false;
            inputs.yearProduct = year;
            return { inputs, loading }
        });
        if (this.state.product != null) {
            // CAMBIAR 1 X 3
            if ((Number(year) === actualYear) && (actualMonth <= 1)) { await this.fetchPredictProductVariation(); }
            else if (Number(year) >= actualYear) { await this.fetchPredictProductVariation(); }
            else { await this.fetchProductVariation(); } 
        }
    }
    
    topMenosFuncion = () => this.setState({topMenos: !this.state.topMenos});

    topMasFuncion = () => this.setState({topMas: !this.state.topMas});

    render = () => {
        return (
            <div>
                <div className={styles.inputs}>
                    <FormControl variant="outlined" className={styles.input}>
                        <InputLabel htmlFor="outlined-age-native-simple">Año</InputLabel>
                        <Select
                            native
                            value={this.state.inputs.year}
                            label="Año"
                            onChange={(event) => this.handleYear(event.target.value)}
                            inputProps={{
                                name: 'year',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" hidden/>
                            { this.state.inputs.years.map((year, i) => 
                                <option value={year} key={i}>{year}</option>
                            )}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" className={styles.input}>
                        <InputLabel htmlFor="outlined-age-native-simple">Mes</InputLabel>
                        <Select
                            native
                            value={this.state.inputs.month}
                            label="Meses"
                            onChange={(event) => this.handleMonth(event.target.value)}
                            inputProps={{
                                name: 'month',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" hidden/>
                            { this.state.inputs.months.map((month, i) => 
                                <option value={month} key={i}>{month}</option>
                            )}
                        </Select>
                    </FormControl>
                </div>

                { (this.state.loading.lBS && this.state.loading.lBA && this.state.loading.lWS && this.state.loading.lWA) ?
                    <div>
                        { (this.state.topMas) ? <LinesSellsGraph label={`Top 10 Productos Más Vendidos`} data={this.state.reports.bestSellers} color='#82ca9d'/>
                          :  <BarGraph data={this.state.reports.bestSellers} keyLegend='Ventas' keyX='product' label='Top 10 Productos Más Vendidos' color='#82ca9d' /> }
                        <div style={{textAlign: 'left', width: '100%', marginLeft: '50px'}}>
                            <Button style={{backgroundColor: '#82ca9d', color: '#fff'}} variant="contained" onClick={() => this.topMasFuncion()}>
                                {(this.state.topMas) ? 'Gráfica de Barra' : 'Gráfica de Línea' }
                            </Button>
                        </div>
                        <PieGraph data={this.state.reports.bestAmounts['data']} keyCenter='product' keyLegend='amount' label='Top 10 Productos Con Más Ganancias' color='#8884d8' />
                        <div className={styles.list_content}>
                            <ul className={`${styles.list} ${styles.listB}`}>
                                {this.state.reports.bestAmounts['data'].map((item, index) => (
                                    <li key={index}>{item.product}: {item.amount} $</li>
                                ))}
                            </ul>
                        </div>
                        
                        { (this.state.topMenos) ? <LinesSellsGraph label={`Top 10 Productos Menos Vendidos`} data={this.state.reports.worstSellers} color='#8884d8'/>
                         : <BarGraph data={this.state.reports.worstSellers} keyLegend='Ventas' keyX='product' label='Top 10 Productos Menos Vendidos' color='#8884d8' /> }
                        <div style={{textAlign: 'left', width: '100%', marginLeft: '50px'}}>
                            <Button variant="contained" color='primary' onClick={() => this.topMenosFuncion()}>
                                {(this.state.topMenos) ? 'Gráfica de Barra' : 'Gráfica de Línea' }
                            </Button>
                        </div>
                        <PieGraph data={this.state.reports.worstAmounts['data']} keyCenter='product' keyLegend='amount' label='Top 10 Productos Con Menos Ganancias' color='#82ca9d' />
                        <div className={styles.list_content}>
                            <ul className={`${styles.list} ${styles.listW}`}>
                                {this.state.reports.worstAmounts['data'].map((item, index) => (
                                    <li key={index}>{item.product}: {item.amount} $</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                :
                    <Grid container justify="center">
                        {array.map((item, index) => (
                            <Box key={index} width={400} height={400} marginRight={10} my={5}>
                                <Skeleton variant='rect' width={400} height={35} />
                                <Box key={index} width={350} height={350} my={4} display='flex' alignItems="center" justifyContent="center">
                                    <Skeleton variant={item.name} width={item.size} height={item.size} />
                                </Box>
                            </Box>
                        ))}
                    </Grid>
                }

                <div className={styles.inputs}>
                    
                    <FormControl variant="outlined" className={styles.input}>
                        <Autocomplete
                            id="combo-box-demo"
                            value={this.state.product}
                            onChange={(event, product) => { this.handleProduct(product); }}
                            options={this.state.products}
                            getOptionLabel={(option) => (option.name).charAt(0).toUpperCase() + (option.name).slice(1) }
                            renderInput={(params) => <TextField {...params} label="Productos" variant="outlined" />}
                        />
                    </FormControl>

                    {(this.state.product != null) ? <FormControl variant="outlined" className={styles.input}>
                        <InputLabel htmlFor="outlined-age-native-simple">Año</InputLabel>
                        <Select
                            native
                            value={this.state.inputs.yearProduct}
                            label="Año"
                            onChange={(event) => this.handleProductYear(event.target.value)}
                            inputProps={{
                                name: 'year',
                                id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" hidden/>
                            { this.state.inputs.years.map((year, i) => 
                                <option value={year} key={i}>{year}</option>
                            )}
                        </Select>
                    </FormControl> : null }
                </div>

                { (this.state.loading.lPVF && this.state.loading.lPV) ?
                    <div>
                        <BubbleGraph label="Ventas en los Ultimos 4 Años" data={this.state.reports.productVariationFour}/>
                        <LinesGraph label={`Ventas del Año ${this.state.inputs.yearProduct}`} data={this.state.reports.productVariation}/>
                    </div>
                :
                    <Grid container justify="center">
                        {Array.from(new Array(2)).map((i, index) => (
                                <Box key={index} width={400} height={400} marginRight={10} my={5}>
                                    <Skeleton variant='rect' width={400} height={35} />
                                    <Box key={index} width={350} height={350} my={4} display='flex' alignItems="center" justifyContent="center">
                                        <Skeleton variant='rect' width={350} height={350} />
                                    </Box>
                                </Box>
                        ))}
                    </Grid>
                }
                
            </div>
        );
    }

}


const mapStateToProps = state => {
    return state.productReducers;
};

export default connect(mapStateToProps, productActions)(ReportsComponent);