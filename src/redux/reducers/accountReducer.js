import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
} from '../types/types_account';

export default function (state = [{ email: "", loggedIn: false, loading: true }], action) {

    switch (action.type) {
        case ACCOUNT_LOGIN:
            return {
                loggedIn: true
            }
        case ACCOUNT_LOGOUT:
            return {
                loggedIn: false
            }
        default:
            return state;
    }
}
