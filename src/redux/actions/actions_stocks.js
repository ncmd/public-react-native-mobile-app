import {
    GET_STOCKS_ALL,
} from '../types/types_stocks';
import firebase from 'react-native-firebase';

export const getStocksAll = () => async dispatch => {
    let data = []
    let ref = firebase.firestore().collection('stocks');
    await ref.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.data())
            data.push(doc.data())
        });
    });
    dispatch({ type: GET_STOCKS_ALL, payload: data });
}

