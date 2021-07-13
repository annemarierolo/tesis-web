import axios from 'axios'
import Alerts from '../../../library/common/Alerts/Alert.jsx'

const UserService = {

    async fetchData() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/users'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.get(url, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    console.log(error.response.status);
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async addUser(user) {
        delete user['tableData']
        delete user['rol']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/users'
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.post(url, user, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },

    async updateUser(user) {
        delete user['tableData']
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/users/' + user.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.put(url, user, { headers: headers })
                .then((res) => {
                    resolve(res.data)
                })
                .catch((error) => {
                    if (error.response.status === 401) Alerts.renewTokenAlert()
                    else reject(error)
                });
        })
    },
    async deleteUser(user) {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/users/' + user.id
            const headers = {
                'x-access-token': localStorage.getItem('token')
            }
            await axios.delete(url, { headers: headers })
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

export default UserService;