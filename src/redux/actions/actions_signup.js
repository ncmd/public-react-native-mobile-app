import {
    GET_SIGNUP_DATA,
    SET_SIGNUP_EMAIL_ADDRESS,
    SET_SIGNUP_PHONE_NUMBER,
    SET_SIGNUP_PASSWORD,
} from '../types/types_signup';
import axios from 'axios';

export const generatePassword = () => async dispatch=> {
    // https://www.dinopass.com/password/simple
    const res = await axios.get('https://www.dinopass.com/password/simple')
    console.log(res.data)
    dispatch({ type: SET_SIGNUP_PASSWORD, payload: res.data });
}

export const signupNewAccount = (email) => async dispatch => {
    const data = { email: email}
    let res = await axios.post('http://localhost:8000/api/signup/register', data)
    console.log(res)
}

export const getSignupData = () => async dispatch => {
    dispatch({ type: GET_SIGNUP_DATA });
}

export const setSignupEmailAddress = (emailaddress) => async dispatch => {
    // const data = { email: email }
    dispatch({ type: SET_SIGNUP_EMAIL_ADDRESS, payload: emailaddress });
    console.log(emailaddress)
};

export const setSignupPhoneNumber= (phonenumber) => async dispatch => {
    // const data = { phone: phone }
    dispatch({ type: SET_SIGNUP_PHONE_NUMBER, payload: phonenumber });
    console.log(phonenumber)
};
