import axios from 'axios';

export const loginCall = async (userCredential, dispatch) => {
    dispatch({type: 'LOGIN_START'});
    try {
        const res = await axios.post('auth/login', userCredential);
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
    } catch(error) {
        dispatch({type: 'LOGIN_FAILURE', payload: error});
    }
};

export const signUp = async (userCredential, dispatch) => {
    dispatch({type: 'SIGNUP_START'});
    try {
        const res = await axios.post('auth/register', userCredential);
        dispatch({type: 'SIGNUP_SUCCESS', payload: res.data});
    } catch(error) {
        dispatch({type: 'SIGNUP_FAILURE', payload: error});
    }
};