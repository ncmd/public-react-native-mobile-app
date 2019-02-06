import {
    SET_SIGNUP_EMAIL_ADDRESS,
} from '../types/types_signup';

export default function (state = [], action) {

    switch (action.type) {
        case SET_SIGNUP_EMAIL_ADDRESS:
            return {
                ...state,
                email: action.payload
            }
        default:
            return state;
    }
}
