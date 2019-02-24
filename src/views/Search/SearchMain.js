import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
    FlatList,
    ScrollView,
    Dimensions,
} from 'react-native';
import HeaderBase from '../../components/Header/HeaderBase'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button, ListItem, SearchBar, CheckBox } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBase from '../../components/Navigation/NavigationBase'
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MIicon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import {
    getStocksAll,
} from '../../redux/actions/actions_stocks';
import {
    stockWatchlistGet,
    stockWatchlistAdd,
    stockWatchlistRemove,
} from '../../redux/actions/actions_stock_watchlist';
import {
    getStock,
} from '../../redux/actions/actions_stock';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';


class SearchMain extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            stockWatchlist:[],
        }
    }

    async componentDidMount() {
        var user = await firebase.auth().currentUser;
        await this.props.getStocksAll()
        await console.log(this.props.stocks)
        await this.props.stockWatchlistGet(user.uid)
        await console.log("SearchMain:", this.props.stockWatchlist)
        this.setState({
            stockWatchlist: this.props.stockWatchlist
        })
    }

    updateSearch = search => {
        this.setState({ search });
    };

    favoriteStock(index) {
        let prevList = this.state.list

        prevList[index].favorite = !prevList[index].favorite
        this.setState({
            list: prevList
        }, () => {
            console.log(this.state.list)
        })
    }



    renderWatch(stockid, stockticker, stockprice) {
        var user = firebase.auth().currentUser;

        let found = false

        this.props.stockWatchlist.map((stock, index) => {
            if (stock.watchlistStockId === stockid) {
                found = true
            }
        })
        if (found === true) {
            return (
                <MIcon name="check-circle" style={{ fontSize: 25, color: '#21ce99' }} onPress={() => this.props.stockWatchlistRemove(stockid, user.uid)}></MIcon>
            )
        }
        if (found === false) {
            return (
                <MIcon name="add-circle-outline" style={{ fontSize: 25, color: '#21ce99' }} onPress={() => this.props.stockWatchlistAdd(stockid, stockticker, stockprice, user.uid)}></MIcon>
            )
        }
    }
    // Used for Flatlist - https://facebook.github.io/react-native/docs/flatlist
    keyExtractor = (item, index) => item.id

    actionStockView = async (stockid) => {
        await this.props.getStock(stockid)
        console.log("SearchMain this.props.stock:", this.props.stock)
        Actions.stockview()
    }

    renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => this.actionStockView(item.id)}
            key={item.id}
            title={item.ticker}
            containerStyle={{ backgroundColor: "#0e0d0d" }}
            titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
            subtitle={item.fullName}
            subtitleStyle={{ paddingTop: 5, fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "grey" }}
            rightElement={this.renderWatch(item.id, item.ticker, item.price)}
            bottomDivider={true}
        />
    )

    renderStockView() {
        const { search } = this.state;
        const { loading } = this.props;

        return (
            !loading && <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled >
                <HeaderBase />
                <SearchBar
                    placeholder="Search..."
                    onChangeText={this.updateSearch}
                    value={search}
                    containerStyle={{ backgroundColor: "#0e0d0d" }}
                />
                <FlatList
                    data={this.props.stocks}
                    extraData={this.props.stockWatchlist}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
            </KeyboardAvoidingView >
        )
    }
    render() {
        return (
            this.renderStockView()
        );
    }
}

function mapStateToProps({ style, account, stocks, stock, stockWatchlist }) {
    return {
        style,
        account,
        stocks,
        stock,
        stockWatchlist,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    getStocksAll,
    getStock,
    stockWatchlistGet,
    stockWatchlistAdd,
    stockWatchlistRemove
})(SearchMain);