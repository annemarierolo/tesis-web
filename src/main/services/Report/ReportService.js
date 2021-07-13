import axios from 'axios'
import Alerts from '../../../library/common/Alerts/Alert.jsx'

const ReportService = {

    async fetchBestSellers(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/best-sellers'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchWorstSellers(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/worst-sellers'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchBestAmounts(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/best-amounts'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchWorstAmounts(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/worst-amounts'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchProductVariationFour(code) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/product-variation-four'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, code, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchProductVariation(data) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/product-variation'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, data, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    // Predictions

    async fetchPredictBestSellers(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/predict-best-sellers'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchPredictWorstSellers(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/predict-worst-sellers'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchPredictBestAmounts(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/predict-best-amounts'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchPredictWorstAmounts(period) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/predict-worst-amounts'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, period, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchPredictProductVariation(data) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/reports/predict-product-variation'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, data, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },
    
}

export default ReportService;