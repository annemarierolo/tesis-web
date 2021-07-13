import { productTypes } from '../types/products';

const initialState = {
    allProducts: [],
    loading: false,
    error: ''
}

const productReducers =  (state = initialState, action) => {
    switch (action.type) {
        case (productTypes.FETCH_PRODUCTS):
            return {
                ...state,
                allProducts: action.payload,
                loading: false,
                error: ''
            }
        
        default:
            return state;
    }
}

export default productReducers;