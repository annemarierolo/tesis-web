import axios from 'axios'
import Alerts from '../../../library/common/Alerts/Alert.jsx'

const ExchangeService = {

    async fetchData() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/exchanges'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async lastExchange() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/exchanges/last'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async getDolars() {
        return new Promise(async(resolve, reject) => {
            const url = 'https://s3.amazonaws.com/dolartoday/data.json'
            await axios.get(url)
                .then((res) => {
                    resolve(res['data']['USD']);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                })
        })
    },

    async addExchange(dolar) {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/exchanges'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, dolar, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async updateExchange(exchange) {
        delete exchange['tableData']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/exchanges/' + exchange.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, exchange, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async getParameter() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/parameters/exchange'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchParameter() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/parameters'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data[0])
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async updateParameter(parameter) {
        delete parameter['tableData']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/parameters/' + parameter.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, parameter, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    }
}

export default ExchangeService;