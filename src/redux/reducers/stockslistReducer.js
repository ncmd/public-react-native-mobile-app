import {
    GET_STOCKS_LIST,
} from '../types/types_stocks_list';

export default function(state = [{loading: true}], action) {
    switch (action.type) {
        case GET_STOCKS_LIST:
            return action.payload;
        default:
            return state;
    }
}