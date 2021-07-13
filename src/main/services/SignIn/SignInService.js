import axios from 'axios'

const SignInService = { 

    async SignIn(user) {
        user['device'] = 'web'
        return new Promise(async (resolve, reject) => {
            const url = 'http://localhost:5000/api/v1/login'
            const headers = {
            'x-access-token': 'hola'
            }
            await axios.post(url, user, { headers: headers })
            .then((res) => {
                resolve(res.data)
            })
            .catch((error) => {
                console.log(error.response);
                reject(error)
            });
        })
        
    }
}

export default SignInService;