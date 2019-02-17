import {
    GET_STOCK,
} from '../types/types_stock';

export default function (state = [], action) {
    switch (action.type) {
        case GET_STOCK:
            return action.payload
        default:
            return state;
    }
}