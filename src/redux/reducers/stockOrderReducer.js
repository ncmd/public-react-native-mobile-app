import {
    STOCK_ORDER,
} from '../types/types_stock_order';

export default function (state = [], action) {
    switch (action.type) {
        case STOCK_ORDER:
            return action.payload
        default:
            return state;
    }
}