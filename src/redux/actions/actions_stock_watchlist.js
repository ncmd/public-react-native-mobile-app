import {
    STOCK_WATCHLIST_ADD,
    STOCK_WATCHLIST_GET,
    STOCK_WATCHLIST_REMOVE,
} from '../types/types_stock_watchlist';
import firebase from 'react-native-firebase';
import { findFirst,findAndDeleteAll } from 'obj-traverse/lib/obj-traverse';

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
    let ref = firebase.firestore().collection('accounts').doc(userid);
    // get existing watchlist

    ref.get().then(function (doc) {

        if (doc.exists) {
            var prevWatchlist = doc.data().watchlist
            var found = false
            // look for existing stockid
            console.log("stockWatchlistAdd",prevWatchlist)
            console.log("stockid",stockid)

            prevWatchlist.map((stock, index) => {
                if (stock.watchlistStockId === stockid) {
                    found = true
                } 
                
            })
            if (found === false){
                console.log("Did not find existing stock in watchlist")
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
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}

export const stockWatchlistRemove = (stockid, userid) => async dispatch => {
    let ref = firebase.firestore().collection('accounts').doc(userid);
  
    ref.get().then(function (doc) {
        if (doc.exists) {
            var prevWatchlist = doc.data().watchlist
            // loop through index of prevpost
            prevWatchlist.map((stock, index) => {
                if (stock.watchlistStockId === stockid) {
                    let foundStock = findFirst(prevWatchlist[index], 'watchlist', { watchlistStockId: stockid })
                    if (foundStock !== false) {
                        if (typeof foundStock.watchlist === 'undefined') {
                            console.log("Found stock, deleting...")
                            prevWatchlist.splice(index, 1);
                            ref.update({
                                watchlist: prevWatchlist
                            })
                            dispatch({ type: STOCK_WATCHLIST_REMOVE, payload: prevWatchlist });
                        } else {
                            prevWatchlist.splice(index, 1);
                            ref.update({
                                watchlist: prevWatchlist,
                            })
                            console.log("Could not find stock",stockid)
                        }
                    }
                }
                return null
            })
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}