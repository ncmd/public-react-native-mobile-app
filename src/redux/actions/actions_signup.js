import {
    SET_SIGNUP_CREDENTIALS,
} from '../types/types_signup';
import axios from 'axios';

export const signupRegister = (email, username) => async dispatch => {
    const data = { email: email, username: username }
    let res = await axios.post('http://localhost:8000/api/signup/register', data)
    console.log(res)
}

export const setSignupEmailAddress = (email) => async dispatch => {
    const data = { email: email }
    dispatch({ type: SET_SIGNUP_EMAIL_ADDRESS, payload: data });
};

export const setSignupCredentials = (email) => async dispatch => {
    const data = { email: email }
    dispatch({ type: SET_SIGNUP_CREDENTIALS, payload: data });
};
