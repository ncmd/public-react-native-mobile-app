import {
    STOCK_ORDER_BUY,
} from '../types/types_stock_order';

export default function (state = [], action) {
    switch (action.type) {
        case STOCK_ORDER_BUY:
            return action.payload
        default:
            return state;
    }
}