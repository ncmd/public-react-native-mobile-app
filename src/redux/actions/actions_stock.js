import {
    GET_STOCK,
} from '../types/types_stock';
import firebase from 'react-native-firebase';
import axios from 'axios';

export const getStock1hr = (stockid, stock) => async dispatch => {
    console.log("getStock:",stockid, stock)
    let data = []
    const twitchstockdata1hr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1hr')
    twitchstockdataAgg = []
    twitchstockdata1hr.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))
    })
    console.log("twitchstockdata1hr",twitchstockdata1hr.data.data)
    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })

    dispatch({ type: GET_STOCK, payload: data });
}

export const getStock24hr = (stockid, stock) => async dispatch => {
    console.log("getStock:",stockid, stock)
    let data = []
    const twitchstockdata24hr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/24hr')
    twitchstockdataAgg = []
    twitchstockdata24hr.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))
    })
    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })

    dispatch({ type: GET_STOCK, payload: data });
}

export const getStock1wk = (stockid, stock) => async dispatch => {
    console.log("getStock:",stockid, stock)
    let data = []
    const twitchstockdata1wk = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1wk')
    twitchstockdataAgg = []
    twitchstockdata1wk.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))
    })
    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })

    dispatch({ type: GET_STOCK, payload: data });
}

export const getStock1mth = (stockid, stock) => async dispatch => {
    console.log("getStock:",stockid, stock)
    let data = []
    const twitchstockdata1mth = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1mth')
    twitchstockdataAgg = []
    twitchstockdata1mth.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))
    })
    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })

    dispatch({ type: GET_STOCK, payload: data });
}

export const getStock1yr = (stockid, stock) => async dispatch => {
    console.log("getStock:",stockid, stock)
    let data = []
    const twitchstockdata1yr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1yr')
    twitchstockdataAgg = []
    twitchstockdata1yr.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))
    })
    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })
    dispatch({ type: GET_STOCK, payload: data });
}



export const getStock = (stockid, stock) => async dispatch => {
    let data = []
    // let ref = firebase.firestore().collection('stocks').doc(stockid);
    // await ref.get().then(function (doc) {
    //     if (doc.exists) {
    //         console.log("getStock doc.data():",doc.data())
    //         data.push(doc.data())
    //     }
    // });

    console.log("getstock stock", stock)

    // const twitchstockdata1hr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1hr')
    // const twitchstockdata24hr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/24hr')
    // const twitchstockdata1wk = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1wk')
    const twitchstockdata = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1mth')
    // const twitchstockdata1yr = await axios.get('https://api.twitchstocks.com/api/v1/stocks/' + stockid + '/history/1yr')
    twitchstockdataAgg = []
    twitchstockdata.data.data.map((data, index) => {
        data.pop()
        twitchstockdataAgg.push(parseFloat(data[0].toFixed(2)))

    })

    data.push({
        fullName: stock.fullName,
        id: stock.id,
        price: stock.price,
        ticker: stock.ticker,
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
        // data1hr: twitchstockdata1hrAgg,
        // data24hr: twitchstockdata24hrAgg,
        // data1wk: twitchstockdata1wkAgg,
        // data1mth: twitchstockdata1mthAgg,
        dataselect: twitchstockdataAgg,
    })

    dispatch({ type: GET_STOCK, payload: data });
}