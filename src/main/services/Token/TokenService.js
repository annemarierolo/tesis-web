import axios from 'axios'

export const TokenService = {

    async renewToken() {
        return new Promise(async(resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/renew'
            let user = JSON.parse(localStorage.getItem('user'))
            
            await axios.post(url, user)
            .then((res) => {
                localStorage.setItem('token', res.data['token'])
                window.location.reload()
                resolve(res.data)
            })
            .catch((error) => {
                console.log("Error", error);
                reject(error)
            });
        })
    },

    async notRenew(){
        return new Promise(async(resolve, reject) => {
           window.location.replace(window.location.origin)
        });
    }
}