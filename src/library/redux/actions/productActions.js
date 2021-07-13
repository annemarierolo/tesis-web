import axios from 'axios'
import { productTypes } from '../types/products';

export const fetchProducts = () => async (dispatch) => {
    dispatch({
        type: productTypes.LOADING,
        payload: true
    });

    try {
        const url = 'http://localhost:5000/api/v1/products'
        const headers = { 'x-access-token': localStorage.getItem('token') };
        axios.get(url, { headers: headers }).then((response) => {
            dispatch({
                type: productTypes.FETCH_PRODUCTS,
                payload: response.data
            });
        })

    } catch (error) {

        dispatch({
            type: productTypes.ERROR,
            payload: []
        });

    }
}

export const addProduct = (product, products) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: productTypes.LOADING,
            payload: true
        });

        try {
            const url = 'http://localhost:5000/api/v1/products';
            const headers = { 'x-access-token': localStorage.getItem('token') };
            axios.post(url, product, { headers: headers })
            .then((res) => {
                products.push(res.data);
                dispatch({
                    type: productTypes.FETCH_PRODUCTS,
                    payload: products
                });

                resolve(products);
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            });

        } catch (error) {
            console.log(error);
            dispatch({
                type: productTypes.ERROR,
                payload: []
            });
        }
    })
}

export const editProduct = (product, products) => async (dispatch) => {
    return new Promise(async (resolve, reject) => {
        dispatch({
            type: productTypes.LOADING,
            payload: true
        });

        try {
            const url = 'http://localhost:5000/api/v1/products/' + product.id;
            const headers = { 'x-access-token': localStorage.getItem('token') };
            await axios.put(url, product, { headers: headers })
            .then(() => {
                let objIndex = products.findIndex((obj => obj.id === product.id));
                products[objIndex] = product

                dispatch({
                    type: productTypes.FETCH_PRODUCTS,
                    payload: products
                });

                resolve(products);
            })
            .catch((error) => {
                reject(error)
            });

        } catch (error) {
            dispatch({
                type: productTypes.ERROR,
                payload: []
            });
        }
    })
}

export const deleteProduct = (product, products) => async (dispatch) => {
    return new Promise(async(resolve, reject) => {
        dispatch({
            type: productTypes.LOADING,
            payload: true
        });

        try {
            const url = 'http://localhost:5000/api/v1/products/' + product.id
            const headers = { 'x-access-token': localStorage.getItem('token') }
            await axios.delete(url, { headers: headers })
            .then(() => {
                let objIndex = products.findIndex((obj => obj.id === product.id));
                products.splice(objIndex, 1);

                dispatch({
                    type: productTypes.FETCH_PRODUCTS,
                    payload: products
                });

                resolve(products);
            })
            .catch((error) => {
                reject(error)
            });
        } catch (error) {
            dispatch({
                type: productTypes.ERROR,
                payload: []
            });
        }
    })
}

export const clearProducts = () => async (dispatch) => {
    dispatch({
        type: productTypes.FETCH_PRODUCTS,
        payload: []
    });
}