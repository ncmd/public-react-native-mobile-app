import {
    STOCK_POSITIONS_ADD,
    STOCK_POSITIONS_GET,
} from '../types/types_stock_positions';

export default function (state = [], action) {
    switch (action.type) {
        case STOCK_POSITIONS_GET:
            return action.payload
        case STOCK_POSITIONS_ADD:
            return {
                ...state,
                positions: action.payload
            }
        default:
            return state;
    }
}