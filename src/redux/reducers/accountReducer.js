import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
    SET_ACCOUNT_INFORMATION,
    LOAD_ACCOUNT_INFORMATION,
} from '../types/types_account';

export default function (state = [{ email: "", phone: "", loggedIn: false, loading: true }], action) {

    switch (action.type) {
        case LOAD_ACCOUNT_INFORMATION:
            return {
                ...state[0],
                emailAddress: action.emailAddress,
                firebaseUid: action.firebaseUid,
                phoneNumber: action.phoneNumber,
                orders: action.orders,
                loggedIn: action.loggedIn,
            };
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
