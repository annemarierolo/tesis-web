import axios from 'axios'
import Alerts from '../../../library/common/Alerts/Alert.jsx'

const CategoryService = {

    async fetchCategory() {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/categories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, {
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

    async addCategory(category) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/categories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, category, {
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

    async updateCategory(category) {
        delete category['tableData']
        delete category['category']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/categories/' + category.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, category, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async fetchSubCategory() {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/subcategories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, {
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

    async addSubCategory(subcategory) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/subcategories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, subcategory, {
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

    async updateSubCategory(subcategory) {
        delete subcategory['tableData']
        delete subcategory['category']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/subcategories/' + subcategory.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, subcategory, { headers: headers })
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

export default CategoryService;