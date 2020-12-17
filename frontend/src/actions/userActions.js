import axios from 'axios'
import {
    USER_ACTIVATE_ACCOUNT_FAIL,
    USER_ACTIVATE_ACCOUNT_REQUEST,
    USER_ACTIVATE_ACCOUNT_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants"

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
}


export const register = (firstName, lastName, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users',
            { firstName, lastName, email, password },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(
            `/api/users/${id}`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Accés interdit. Token invalide') {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message
        })
    }
}


export const UpdateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put(
            `/api/users/profile`,
            user,
            config
        )

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })


        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Accés interdit. Token invalide') {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message
        })
    }
}


export const activate = (token) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIVATE_ACCOUNT_REQUEST,
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(
            '/api/users/activate-account',
            { token },
            config
        )

        dispatch({
            type: USER_ACTIVATE_ACCOUNT_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_ACTIVATE_ACCOUNT_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}