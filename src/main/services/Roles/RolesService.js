import axios from 'axios'
import Alerts from '../../../library/common/Alerts/Alert.jsx'

const RolesService = {

    async fetchData() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/roles'
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
    }
}

export default RolesService;