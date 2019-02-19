import {
    STOCK_POSITIONS_ADD,
    STOCK_POSITIONS_GET,
} from '../types/types_stock_positions';
import firebase from 'react-native-firebase';

export const stockPositionsGet = (userid) => async dispatch => {
    let data = []
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing positions

    await ref.get().then(function (doc) {
        if (doc.exists) {
            var prevPositions = doc.data().positions
            console.log("prevPositions:",prevPositions)
            // add new data
            dispatch({ type: STOCK_POSITIONS_GET, payload: prevPositions });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // add to redux
    
}

export const stockPositionsAdd = (userid, stockticker, stockid) => async dispatch => {
    let data = {
        positionsStockId: stockid,
        positionsTicker: stockticker,
    }
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing positions

    ref.get().then(function (doc) {
        if (doc.exists) {
            var prevPositions = doc.data().positions
            // add new data
            prevPositions.push({
                positionsStockId: stockid,
                positionsTicker: stockticker,
            })
            ref.update({
                positions: prevPositions
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // add to redux
    dispatch({ type: STOCK_POSITIONS_ADD, payload: data });
}