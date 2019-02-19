import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
    TouchableHighlight,
    FlatList,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import { Actions } from 'react-native-router-flux';
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation';
import NavigationBase from '../../components/Navigation/NavigationBase';
import PortfolioMain from '../../views/Portfolio/PortfolioMain';
import SearchMain from '../../views/Search/SearchMain';
import AccountMain from '../../views/Account/AccountMain';
import {
    accountLogin,
    loadAccountInformation,
} from '../../redux/actions/actions_account';
import firebase from 'react-native-firebase';
import {
    stockWatchlistGet,
} from '../../redux/actions/actions_stock_watchlist';
import {
    stockPositionsGet,
} from '../../redux/actions/actions_stock_positions';

class BaseMain extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
        }
    }

    async componentWillMount() {
        var user = firebase.auth().currentUser;
        console.log("User:", user)
        await this.props.loadAccountInformation(user.uid)
        await console.log("BaseMain this.props.account:", this.props.account)
        await this.props.stockWatchlistGet(user.uid)
        await this.props.stockPositionsGet(user.uid)
        await console.log("BaseMain this.props.stockWatchlist:", this.props.stockWatchlist)
        await console.log("BaseMain this.props.stockPositions:", this.props.stockPositions)
        
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    renderView() {
        if (this.props.bottomnavigation == 'portfolio') {
            return (
                <PortfolioMain />
            )
        } else if (this.props.bottomnavigation == 'search') {
            return (
                <SearchMain />
            )
        } else if (this.props.bottomnavigation == 'account') {
            return (
                <AccountMain />
            )
        } else {
            return (
                <PortfolioMain />
            )
        }
    }

    render() {
        // Initializing Props from ./redux/reducers/stylesReducer.js
        const { loading } = this.props;

        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <View style={{ flex: 1 }}>
                    {this.renderView()}
                </View>
                <NavigationBase />
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ style, bottomnavigation, account, stockWatchlist, stockPositions }) {
    return {
        style,
        bottomnavigation,
        account,
        stockWatchlist,
        stockPositions,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    setBottomNavigation,
    loadAccountInformation,
    stockWatchlistGet,
    stockPositionsGet,
})(BaseMain);