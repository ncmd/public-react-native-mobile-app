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
    Alert,
} from 'react-native';
import { ButtonGroup, Button } from 'react-native-elements';
import Header from '../../components/Header/HeaderBase'
import { systemWeights } from 'react-native-typography'
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Actions } from 'react-native-router-flux'
import {
    stockPositionsAdd
} from '../../redux/actions/actions_stock_positions';
import {
    stockOrderBuy,
} from '../../redux/actions/actions_stock_order';
import {
    loadAccountInformation,
} from '../../redux/actions/actions_account';
import firebase from 'react-native-firebase';

class StockOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            tradeOptionsSelectedIndex: 0,
            tradeOptionValues: ["BUY", "SELL"],
            stockData: [50.01, 10.01, 33.33],
            status: "Disconnected",
            open: false,
            text: '',
            chat: [],
            stockShareQuantity: '',
            stockQuantityValid: true,
            stockShareOrderValue: '',
            shortcutOrderAmountValues: ['+1', '+10', '+100', '+1000', 'MAX'],
        }
        this.updateIndex = this.updateIndex.bind(this)
        this.updateTradeOptionIndex = this.updateTradeOptionIndex.bind(this)

        if (process.env.APP_ENV === 'production') {
            this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/wsstock');
        } else {
            if (Platform.OS === 'ios') {
                this.socket = new WebSocket('ws://127.0.0.1:8080/wsstock');
            }
            if (Platform.OS === 'android') {
                this.socket = new WebSocket('ws://10.0.2.2:8080/wsstock');
            }
        }
    }

    componentDidMount() {
        var user = firebase.auth().currentUser;
        console.log("User:", user)
        this.props.loadAccountInformation(user.uid)
        console.log("StockOrder - this.props.account", this.props.account)
        // When socket opens
        this.socket.onopen = () => {
            // Check if Socket Open
            this.setState({ status: "Connected Stock Socket" })
        }

        // When socket closes
        this.socket.onclose = () => {
            this.socket.send("Closing Stock Socket");
            this.setState({ status: "Disconnected Stock Socket" })
        }

        // When socket receives messages
        this.socket.onmessage = (e) => {
            console.log(e)
            prevStockData = this.state.stockData
            prevStockData.push(parseInt(e.data))
            if (prevStockData.length > 10) {
                prevStockData.shift()
                this.setState({
                    stockData: prevStockData
                })
            } else {
                this.setState({
                    stockData: prevStockData
                })
            }
        }
    }

    onChangeStockShareQuantity(quantity) {
        this.setState({ stockShareQuantity: quantity }, () => {
            if (this.state.stockShareQuantity.length > 0) {
                this.setState({ stockQuantityValid: false })
            } else {
                this.setState({ stockQuantityValid: true })
            }
        })
    }

    stockOrderSubmit = async () => {
        // stockOrderSubmit(){
        var user = await firebase.auth().currentUser;
        console.log("User:", user)
        // stockOrderBuy = (userid,price,quantity,ticker)
        console.log("This stock:", this.props.stock)
        await this.props.stockOrderBuy(user.uid, this.state.stockData[this.state.stockData.length - 1], this.state.stockShareQuantity, this.props.stock[0].ticker)
        await this.props.stockPositionsAdd(this.props.stock[0].id, this.props.stock[0].ticker, this.state.stockData[this.state.stockData.length - 1], this.state.stockShareQuantity, user.uid)
        Actions.reset('stockorderinvoice')

    }

    stockOrderReview() {
        Alert.alert(
            "Order Summary",
            'You are purchasing ' + this.state.stockShareQuantity + ' shares of ' + this.props.stock[0].ticker + ' totaling to ' + this.state.stockShareOrderValue,
            [
                { text: 'Submit', onPress: () => this.stockOrderSubmit() },
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
        )
    }

    renderShortcutOrderAmount() {
        const { selectedIndex } = this.state
        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={this.state.shortcutOrderAmountValues}
                buttonStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 5 }}
                containerStyle={{ backgroundColor: 'rgba(33,206,153,0.0)', borderRadius: 10, borderWidth: 0 }}
                textStyle={{ paddingLeft: 5, paddingRight: 5, color: '#21ce99', fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, borderWidth: 0 }}
                selectedButtonStyle={{ backgroundColor: '#21ce99', height: 10, margin: 7, borderRadius: 5, borderWidth: 0 }}
                selectedTextStyle={{ color: '#0e0d0d', fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}
                innerBorderStyle={{ width: 0 }}
            />
        )
    }

    renderTradeOptions() {
        const { tradeOptionsSelectedIndex } = this.state
        return (
            <ButtonGroup
                onPress={this.updateTradeOptionIndex}
                selectedIndex={tradeOptionsSelectedIndex}
                buttons={this.state.tradeOptionValues}
                buttonStyle={{ backgroundColor: 'transparent', borderWidth: 0, padding: 5 }}
                containerStyle={{ backgroundColor: 'rgba(33,206,153,0.0)', borderRadius: 10, borderWidth: 0 }}
                textStyle={{ paddingLeft: 5, paddingRight: 5, color: '#21ce99', fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, borderWidth: 0 }}
                selectedButtonStyle={{ backgroundColor: '#21ce99', height: 10, margin: 7, borderRadius: 5, borderWidth: 0 }}
                selectedTextStyle={{ color: '#0e0d0d', fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}
                innerBorderStyle={{ width: 0 }}
            />
        )
    }

    updateTradeOptionIndex(tradeOptionsSelectedIndex) {
        this.setState({ tradeOptionsSelectedIndex })
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
        if (selectedIndex == 0) {
            if (this.state.stockShareQuantity === "") {
                this.setState({
                    stockShareQuantity: (1).toString(),
                    stockQuantityValid: false
                })
            } else {
                this.setState({
                    stockShareQuantity: (1 + parseInt(this.state.stockShareQuantity)).toString(),
                    stockQuantityValid: false
                })
            }
        } else if (selectedIndex == 1) {
            if (this.state.stockShareQuantity === "") {
                this.setState({
                    stockShareQuantity: (10).toString(),
                    stockQuantityValid: false
                })
            } else {
                this.setState({
                    stockShareQuantity: (10 + parseInt(this.state.stockShareQuantity)).toString(),
                    stockQuantityValid: false
                })
            }
        } else if (selectedIndex == 2) {
            if (this.state.stockShareQuantity === "") {
                this.setState({
                    stockShareQuantity: (50).toString(),
                    stockQuantityValid: false
                })
            } else {
                this.setState({
                    stockShareQuantity: (50 + parseInt(this.state.stockShareQuantity)).toString(),
                    stockQuantityValid: false
                })
            }
        } else if (selectedIndex == 3) {
            if (this.state.stockShareQuantity === "") {
                this.setState({
                    stockShareQuantity: (1000).toString(),
                    stockQuantityValid: false
                })
            } else {
                this.setState({
                    stockShareQuantity: (1000 + parseInt(this.state.stockShareQuantity)).toString(),
                    stockQuantityValid: false
                })
            }
        } else if (selectedIndex == 4) {
            if (this.state.stockShareQuantity === "") {
                this.setState({
                    stockShareQuantity: (9999).toString(),
                    stockQuantityValid: false
                })
            } else {
                this.setState({
                    stockShareQuantity: (9999 + parseInt(this.state.stockShareQuantity)).toString(),
                    stockQuantityValid: false
                })
            }
        }
    }

    render() {
        const { loading } = this.props
        return (
            !loading && <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }} enabled>
                <Header />
                <View style={{ flex: 1 }}>
                    {this.renderTradeOptions()}
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ width: "50%", fontSize: 10, color: "#21ce99", paddingLeft: 10, fontWeight: systemWeights.bold.fontWeight }}>BUYING POWER</Text>
                        <Text style={{ width: "50%", fontSize: 15, color: "white", textAlign: "right", paddingRight: 10, fontWeight: systemWeights.bold.fontWeight }}>${this.state.stockData[this.state.stockData.length - 1]}</Text>
                    </View>
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ width: "50%", fontSize: 10, paddingLeft: 10, color: "#21ce99", fontWeight: systemWeights.bold.fontWeight }}>SHARES OF {this.props.stock[0].ticker}</Text>
                        <TextInput maxLength={5} multiline={false} autoFocus placeholder="0" placeholderTextColor="grey" keyboardType='number-pad' style={{ fontWeight: systemWeights.bold.fontWeight, color: "white", width: "50%", fontSize: 25, textAlign: "right", paddingRight: 10 }}
                            onChangeText={(quantity) => this.onChangeStockShareQuantity(quantity)}>{this.state.stockShareQuantity}
                        </TextInput>
                    </View>
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ width: "50%", fontSize: 10, color: "#21ce99", paddingLeft: 10, fontWeight: systemWeights.bold.fontWeight }}>MARKET PRICE</Text>
                        <Text style={{ width: "50%", fontSize: 15, color: "white", textAlign: "right", paddingRight: 10, fontWeight: systemWeights.bold.fontWeight }}>${this.state.stockData[this.state.stockData.length - 1]}</Text>
                    </View>
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ width: "50%", fontSize: 10, color: "#21ce99", paddingLeft: 10, fontWeight: systemWeights.bold.fontWeight }}>ESTIMATED COST</Text>
                        <NumberFormat
                            style={{ color: 'red' }}
                            value={this.state.stockShareQuantity * this.state.stockData[this.state.stockData.length - 1]}
                            onValueChange={value => this.setState({ stockShareOrderValue: value.formattedValue })}
                            displayType={'text'}
                            thousandSeparator={true}
                            decimalScale={2}
                            prefix={'$'}
                            renderText={value => <Text style={{ width: "50%", fontSize: 15, color: "white", textAlign: "right", paddingRight: 10, fontWeight: systemWeights.bold.fontWeight }}>{value}</Text>}
                        />
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 0, width: "100%" }}>
                <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.stockQuantityValid} title="Review" titleStyle={{ fontWeight: systemWeights.regular.fontWeight, color: '#0e0d0d' }} buttonStyle={{ borderRadius: 25, backgroundColor: "#21ce99", marginBottom: 5,marginLeft:"5%",marginRight:"5%" }} onPress={() => this.stockOrderReview()}></Button>
                    {this.renderShortcutOrderAmount()}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ style, stock, account }) {
    return {
        style, stock, account
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    stockOrderBuy,
    loadAccountInformation,
    stockPositionsAdd,
})(StockOrder);