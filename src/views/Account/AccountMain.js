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
import { ButtonGroup, Button, ListItem, SearchBar } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBase from '../../components/Navigation/NavigationBase'
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MCIicon from 'react-native-vector-icons/MaterialCommunityIcons';

class AccountMain extends React.Component {
    constructor() {
        super()
        this.state = {
            search: '',
            list: [
                {
                    key: 'a',
                    name: 'Referrals',
                    subtitle: 'Invite Friends to the Platform'
                },
                {
                    key: 'b',
                    name: 'Account Summary',
                    subtitle: 'Status, Balances, Docs'
                },
                {
                    key: 'c',
                    name: 'Transfers',
                    subtitle: 'Deposits, Withdrawals'
                },
                {
                    key: 'd',
                    name: 'History',
                    subtitle: 'Trades, Dividends, Transfers'
                },
                {
                    key: 'e',
                    name: 'Settings',
                    subtitle: 'Security, Subscription'
                },
                {
                    key: 'f',
                    name: 'Help',
                    subtitle: 'Support, Guides'
                },
            ]
        }
    }

    componentDidMount() {

    }

    keyExtractor = (item, index) => index

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            containerStyle={{ backgroundColor: "#0e0d0d" }}
            titleStyle={{ fontSize: 16, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
            subtitleStyle={{ paddingTop: 5, fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "grey" }}
            bottomDivider={true}
            rightElement={<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <MIcon name="keyboard-arrow-right" style={{ fontSize: 20, color: '#21ce99' }}></MIcon>
            </View>}
        />
    )


    renderStockView() {
        const { search } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <HeaderBase />
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                    scrollEnabled={false}
                />
                <Text style={{ paddingLeft: 15, paddingTop: 5, fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "grey" }}>Account Number</Text>
                <Text style={{ paddingLeft: 15, paddingTop: 5, fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "grey" }}>ABC123ABC123ABC123ABC</Text>
                <Text style={{ paddingBottom: 25, paddingLeft: 15, paddingTop: 5, fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "#21ce99" }}>LOGOUT</Text>
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

export default AccountMain;