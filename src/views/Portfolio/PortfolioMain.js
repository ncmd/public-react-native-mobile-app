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
    TouchableOpacity,
    Animated,
} from 'react-native';
import HeaderBase from '../../components/Header/HeaderBase'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button, ListItem } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBase from '../../components/Navigation/NavigationBase'
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MCIicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PortfolioPerformance from './PortfolioPerformance';
import PortfolioIpo from './PortfolioIpo';
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import {
    stockWatchlistGet,
} from '../../redux/actions/actions_stock_watchlist';
import {
    getStocksAll,
} from '../../redux/actions/actions_stocks';
import {
    stockPositionsGet
} from '../../redux/actions/actions_stock_positions';
import firebase from 'react-native-firebase';

const ShadowDOWN = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={4}
        strokeLinejoin={'round'}
        stroke={'rgba(244,85,49,0.4)'}
    />
)

const ShadowUP = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={4}
        strokeLinejoin={'round'}
        stroke={'rgba(33,206,153,0.4)'}
    />
)

class PortfolioMain extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            routes: [
                { key: 'performance', title: "Performance" },
                { key: 'positions', title: "Positions" },
                { key: 'watchlist', title: "Watchlist" },
            ],
        }
    }

    async componentDidMount() {
        var user = await firebase.auth().currentUser;
        await this.props.getStocksAll()
        await console.log(this.props.stocks)
        await this.props.stockWatchlistGet(user.uid)
        await console.log(this.props.stockWatchlist)
        await this.props.stockPositionsGet(user.uid)
        console.log("This props account:",this.props.account)
    }



    keyExtractorPositions = (item, index) => item.positionsStockId
    keyExtractorWatchlist = (item, index) => item.watchlistStockId

    renderItemPositions = ({ item }) => (
        <ListItem
            onPress={() => Actions.stockview()}
            key={item.positionStockId}
            title={item.positionsStockTicker.toUpperCase()}
            containerStyle={{ backgroundColor: "#0e0d0d" }}
            titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
            rightElement={<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button title={<NumberFormat
                    value={(item.positionsStockQuantity * item.positionsStockPrice).toString()}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={2}
                    prefix={'$'}
                    renderText={value => <Text style={{ width: "50%", fontSize: 15, color: "#0e0d0d", textAlign: "right", paddingRight: 10, fontWeight: systemWeights.bold.fontWeight }}>{value}</Text>}
                />} buttonStyle={{ width: 120, borderRadius: 5, backgroundColor: "#21ce99" }} titleStyle={{ fontSize: 14, color: "#0e0d0d", fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight }}></Button>
            </View>}
            bottomDivider={true}
        />
    )

    renderItemWatchlist = ({ item }) => (
        <ListItem
            onPress={() => Actions.stockview()}
            key={item.watchlistStockId}
            title={item.watchlistStockTicker.toUpperCase()}
            containerStyle={{ backgroundColor: "#0e0d0d" }}
            titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
            rightElement={<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Button title={"$" + item.watchlistStockPrice.toFixed(2).toString()} buttonStyle={{ width: 90, borderRadius: 5, backgroundColor: "#21ce99" }} titleStyle={{ fontSize: 14, color: "#0e0d0d", fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight }}></Button>
            </View>}
            bottomDivider={true}
        />
    )

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#21ce99' : 'grey')
                        ),
                    });
                    return (
                        <TouchableOpacity
                            key={i}
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ fontSize: 14, color: color, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    // Portfolio
    FirstRoute = () => (
        <PortfolioPerformance />
    );

    // Search
    SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#0e0d0d' }]} >
            <FlatList
                keyExtractor={this.keyExtractorPositions}
                data={this.props.stockPositions}
                renderItem={this.renderItemPositions}
            />
        </View>
    );

    // Account
    ThirdRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#0e0d0d' }]} >
            <FlatList
                keyExtractor={this.keyExtractorWatchlist}
                data={this.props.stockWatchlist}
                renderItem={this.renderItemWatchlist}
            />
        </View>
    );

    FourthRoute = () => (
        <PortfolioIpo />
    );

    renderStockView() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <HeaderBase />
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        performance: this.FirstRoute,
                        positions: this.SecondRoute,
                        watchlist: this.ThirdRoute,
                    })}
                    onIndexChange={this._handleIndexChange}
                    renderTabBar={this._renderTabBar}
                />
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "rgba(33,206,153,0.2)"
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
});

function mapStateToProps({ style, stockWatchlist, stockPositions, account, stocks, stock }) {
    return {
        style,
        stockWatchlist,
        stockPositions,
        account,
        stocks,
        stock,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    stockWatchlistGet,
    getStocksAll,
    stockPositionsGet,
})(PortfolioMain);