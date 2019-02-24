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

export const stockPositionsAdd = (stockid, stockticker, stockprice, stockquantity,userid) => async dispatch => {
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing positions

    ref.get().then(function (doc) {
        if (doc.exists) {
            var prevPositions = doc.data().positions
            // add new data
            prevPositions.push({
                positionsStockId: stockid,
                positionsStockTicker: stockticker,
                positionsStockPrice: stockprice,
                positionsStockQuantity: stockquantity,
            })
            ref.update({
                positions: prevPositions
            })
            dispatch({ type: STOCK_WATCHLIST_ADD, payload: prevPositions });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}