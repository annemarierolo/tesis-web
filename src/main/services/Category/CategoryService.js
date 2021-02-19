import axios from 'axios'

const CategoryService = {

    async fetchCategory() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/categories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    console.log("Errorrr", error);
                    reject(error)
                });
        })
    },

    async fetchSubCategory() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/subcategories'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
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

export default CategoryService;