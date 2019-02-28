import {
    ACCOUNT_NET_WORTH_ADD,
    ACCOUNT_NET_WORTH_GET,
} from '../types/types_account_net_worth';

export default function (state = [], action) {
    switch (action.type) {
        case ACCOUNT_NET_WORTH_GET:
            return action.payload
        case ACCOUNT_NET_WORTH_ADD:
            return {
                ...state,
                positions: action.payload
            }
        default:
            return state;
    }
}