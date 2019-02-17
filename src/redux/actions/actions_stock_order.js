import {
    STOCK_ORDER,
} from '../types/types_stock_order';
import firebase from 'react-native-firebase';

export const stockOrder = (data) => async dispatch => {
    dispatch({ type: STOCK_ORDER, payload: data });
}