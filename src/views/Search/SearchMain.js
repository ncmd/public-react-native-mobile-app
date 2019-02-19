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
            list: [
                {
                    key: 'a',
                    name: 'APPLE',
                    subtitle: "A computer company",
                    stocktrend: [12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09, 10.55, 10.73, 10.65, 10.4, 10.32, 9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28],
                    stockprice: '$10000.28',
                    favorite: true,
                },
                {
                    key: 'b',
                    name: 'AMAZO',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'c',
                    name: 'MICRO',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'd',
                    name: 'SPLUNK',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'e',
                    name: 'ALIBA',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'f',
                    name: 'AMD',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'g',
                    name: 'NVIDI',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'h',
                    name: 'SHOPI',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'i',
                    name: 'FLEXI',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                },
                {
                    key: 'j',
                    name: 'GOOGL',
                    subtitle: "A computer company",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09',
                    favorite: false,
                }
            ],
        }
    }

    async componentDidMount() {
        await this.props.getStocksAll()
        await console.log(this.props.stocks)
        await this.props.stockWatchlistGet()
        await console.log(this.props.stockWatchlist)
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
        return (
            <MIcon name="add-circle-outline" style={{ fontSize: 25, color: '#21ce99' }} onPress={() => this.props.stockWatchlistAdd(stockid, stockticker, stockprice, user.uid)}></MIcon>
        )

        // var user = firebase.auth().currentUser;
        // var check = false
        // console.log("User:", user)
        // console.log("renderWatch:", this.props.stockWatchlist.length, this.props.stockWatchlist)
        // if (this.props.stockWatchlist.length > 0) {
        //     this.props.stockWatchlist.map((stock) => {
        //         if (stockid === stock.watchlistStockId) {
        //             console.log("Found Match!!!", stock.watchlistStockId, stockid)
        //             check = true

        //         } else {
        //             check = false
        //             console.log("No Match!!!", stockid)

        //         }
        //     })
        // }
        // if (check === true) {
        //     return (
        //         <MIcon name="check-circle" style={{ fontSize: 25, color: '#21ce99' }} onPress={() => this.props.stockWatchlistAdd(stockid, user.uid)}></MIcon>
        //     )
        // } else {
        // return (
        //     <MIcon name="add-circle-outline" style={{ fontSize: 25, color: '#21ce99' }} onPress={() => this.props.stockWatchlistAdd(stockid, user.uid)}></MIcon>
        // )
        // }
    }
    // Used for Flatlist - https://facebook.github.io/react-native/docs/flatlist
    keyExtractor = (item, index) => item.watchlistStockId

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
                    extraData={this.props.stocks}
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
    stockWatchlistAdd
})(SearchMain);