import {
    ACCOUNT_LOGIN,
    ACCOUNT_LOGOUT,
} from '../types/types_account';

export default function (state = [{ account_login_status: false, loading: true }], action) {

    switch (action.type) {
        case ACCOUNT_LOGIN:
            return action.payload;
        case ACCOUNT_LOGOUT:
            return action.payload;
        default:
            return state;
    }
}
