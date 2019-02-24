import {
    STOCK_WATCHLIST_ADD,
    STOCK_WATCHLIST_GET,
    STOCK_WATCHLIST_REMOVE,
} from '../types/types_stock_watchlist';

export default function (state = [], action) {
    switch (action.type) {
        case STOCK_WATCHLIST_GET:
            return action.payload
        case STOCK_WATCHLIST_ADD:
            return action.payload
        case STOCK_WATCHLIST_REMOVE:
            return action.payload
        default:
            return state;
    }
}