import {
    STOCK_WATCHLIST_ADD,
    STOCK_WATCHLIST_GET,
} from '../types/types_stock_watchlist';
import firebase from 'react-native-firebase';

export const stockWatchlistGet = (userid) => async dispatch => {
    let data = []
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing watchlist

    await ref.get().then(function (doc) {
        if (doc.exists) {
            var prevWatchlist = doc.data().watchlist
            console.log("prevWatchlist:", prevWatchlist)
            // add new data
            dispatch({ type: STOCK_WATCHLIST_GET, payload: prevWatchlist });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
    // add to redux

}

export const stockWatchlistAdd = (stockid, stockticker, stockprice, userid) => async dispatch => {
    let data = {
        watchlistStockId: stockid,
        watchlistStockTicker: stockticker,
        watchlistStockPrice: stockprice,
    }
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing watchlist

    ref.get().then(function (doc) {
        if (doc.exists) {
            var prevWatchlist = doc.data().watchlist
            // add new data
            prevWatchlist.push({
                watchlistStockId: stockid,
                watchlistStockTicker: stockticker,
                watchlistStockPrice: stockprice,
            })
            ref.update({
                watchlist: prevWatchlist
            })
            dispatch({ type: STOCK_WATCHLIST_ADD, payload: prevWatchlist });
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}