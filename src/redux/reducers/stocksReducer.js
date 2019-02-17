import {
    GET_STOCKS_ALL,
} from '../types/types_stocks';

export default function (state = [], action) {
    switch (action.type) {
        case GET_STOCKS_ALL:
            return action.payload
        default:
            return state;
    }
}