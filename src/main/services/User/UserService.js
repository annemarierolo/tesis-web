import axios from 'axios'

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
                    console.log("Errorrr", error);
                    reject(error)
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
                    console.log("Errorrr", error);
                    reject(error)
                });
        })

    }
}

export default UserService;