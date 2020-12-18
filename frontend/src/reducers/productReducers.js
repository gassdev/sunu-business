import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_BY_ARRIVAL_FAIL,
    PRODUCT_LIST_BY_ARRIVAL_REQUEST,
    PRODUCT_LIST_BY_ARRIVAL_SUCCESS,
    PRODUCT_LIST_BY_SELL_FAIL,
    PRODUCT_LIST_BY_SELL_REQUEST,
    PRODUCT_LIST_BY_SELL_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants"


export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const productListBySellReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_BY_SELL_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_BY_SELL_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_BY_SELL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}



export const productListByArrivalReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_BY_ARRIVAL_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_BY_ARRIVAL_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_BY_ARRIVAL_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}