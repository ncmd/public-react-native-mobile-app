import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
    SET_ACCOUNT_INFORMATION,
    LOAD_ACCOUNT_INFORMATION,
} from '../types/types_account';

export default function (state = [{ email: "", phone: "", loggedIn: false, loading: true }], action) {

    switch (action.type) {
        case LOAD_ACCOUNT_INFORMATION:
        console.log("...state:",{...state})
        console.log("...state[0]:",{...state[0]})
            return state;
        case SET_ACCOUNT_INFORMATION:
            return [{
                ...state[0],
                email: action.payload.email,
                phone: action.payload.phone,
            }];
        case ACCOUNT_LOGIN:
            return {
                ...state[0],
                loggedIn: action.payload
            }
        case ACCOUNT_LOGOUT:
            return {
                ...state[0],
                loggedIn: action.payload
            }
        default:
            return state;
    }
}
