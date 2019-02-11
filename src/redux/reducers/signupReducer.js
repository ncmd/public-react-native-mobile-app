import {
    GET_SIGNUP_DATA,
    SET_SIGNUP_EMAIL_ADDRESS,
    SET_SIGNUP_PHONE_NUMBER,
    SET_SIGNUP_PASSWORD,
} from '../types/types_signup';

export default function (state = [{ password:"",email: "", phone: "", loading: true }], action) {

    switch (action.type) {
        case GET_SIGNUP_DATA:
            return { ...state }
        case SET_SIGNUP_PASSWORD:
            return [{ ...state[0], password: action.payload }];
        case SET_SIGNUP_EMAIL_ADDRESS:
            return [{ ...state[0], email: action.payload }];
        case SET_SIGNUP_PHONE_NUMBER:
            return [{ ...state[0], phone: action.payload }]
        default:
            return { ...state }
    }
}
