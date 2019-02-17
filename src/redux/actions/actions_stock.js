import {
    GET_STOCK,
} from '../types/types_stock';
import firebase from 'react-native-firebase';

export const getStock = (stockid) => async dispatch => {
    let data = []
    let ref = firebase.firestore().collection('stocks').doc(stockid);
    await ref.get().then(function (doc) {
        if (doc.exists) {
            console.log("getStock doc.data():",doc.data())
            data.push(doc.data())
        }
    });
    dispatch({ type: GET_STOCK, payload: data });
}