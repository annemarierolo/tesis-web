import axios from 'axios'

const ProductService = {

    async fetchProduct() {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/products'
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
                    console.log("Errorrr", error);
                    reject(error)
                });
        })
    },

    async addProduct(product) {
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/products'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, product, {
                    headers: headers
                })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    console.log("Errorrr", error);
                    reject(error)
                });
        })
    },

    async updateProduct(product) {
        delete product['tableData']
        delete product['product']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/products/' + product.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, product, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    console.log("Errorrr", error);
                    reject(error)
                });
        })
    },

    async uploadCSV(csv) {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/sales/upload'
            const headers = {
                'Content-Type': 'multipart/form-data',
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, csv, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    console.log("Errorrr", error);
                    reject(error)
                });
        })
      }
    
}

export default ProductService;