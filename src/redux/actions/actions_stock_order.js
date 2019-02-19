import {
    STOCK_ORDER_BUY,
} from '../types/types_stock_order';
import firebase from 'react-native-firebase';

export const stockOrderBuy = (userid, price, quantity, ticker) => async dispatch => {
    let data = {
        orderPrice: price,
        orderQuantity: quantity,
        orderTicker: ticker,
    }
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing orders

    ref.get().then(function (doc) {
        if (doc.exists) {
            var prevOrders = doc.data().orders
            // add new data
            prevOrders.push({
                orderMarketPrice: parseFloat(price),
                orderCostPrice: parseFloat(price) * parseInt(quantity),
                orderQuantity: parseInt(quantity),
                orderTicker: ticker,
            })
            ref.update({
                orders: prevOrders
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // add to redux
    dispatch({ type: STOCK_ORDER_BUY, payload: data });
}

// stockOrderBuy
// add firestore record
// map
// stockTicker: CPP
// stockQuantity: 10
// stockOrderDate: timestamp
// 


// import {
//     GET_STOCK,
// } from '../types/types_stock';
// import firebase from 'react-native-firebase';

// export const getStock = (stockid) => async dispatch => {
//     let data = []
//     let ref = firebase.firestore().collection('stocks').doc(stockid);
//     await ref.get().then(function (doc) {
//         if (doc.exists) {
//             console.log("getStock doc.data():",doc.data())
//             data.push(doc.data())
//         }
//     });
//     dispatch({ type: GET_STOCK, payload: data });
// }