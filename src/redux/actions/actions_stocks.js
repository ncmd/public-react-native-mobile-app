import {
    GET_STOCKS_ALL,
} from '../types/types_stocks';
import firebase from 'react-native-firebase';
import axios from 'axios';

export const getStocksAll = () => async dispatch => {
    let data = []

    // let ref = firebase.firestore().collection('stocks');
    // await ref.get().then(function (querySnapshot) {
    //     querySnapshot.forEach(function (doc) {
    //         console.log("getStocksAll",doc.data())
    //         data.push(doc.data())
    //     });
    // });

    const twitchstockdata = await axios.get('https://api.twitchstocks.com/api/v1/stocks')
    await console.log(twitchstockdata.data.data.stocks)
    twitchstockdata.data.data.stocks.map((stock) => {
        data.push({
            fullName: stock.name,
            id: stock.id,
            price: stock.price,
            ticker: stock.symbol,
            followers: stock.followers,
            views: stock.views,
            popularity: stock.popularity,
            logo: stock.logo,
            mature: stock.mature,
            status: stock.status,
            game: stock.game,
            language: stock.language,
            partner: stock.partner,
            url: stock.url,
            broadcaster_type: stock.broadcaster_type,
            description: stock.description,
            created_at: stock.created_at,
            updated_at: stock.updated_at,
            updated: stock.updated,
            date_added: stock.date_added,
            change1hr: stock.change1hr,
            change24hr: stock.change24hr,
            change1wk: stock.change1wk,
            change1yr: stock.change1yr,
            changeall: stock.changeall,
            change1mth: stock.change1mth,
            live: stock.live,
            broadcast_platform: stock.broadcast_platform,
            stream_type: stock.stream_type,
            created_at: stock.created_at,
            viewers: stock.viewers,
            game: stock.game,
        })
    })

    // fullName: "University of California, Berkeley"
    // id: "gDRj9edkCNn24HSbnyWs"
    // price: 11.03
    // ticker: "CAL"
    dispatch({ type: GET_STOCKS_ALL, payload: data });
}

