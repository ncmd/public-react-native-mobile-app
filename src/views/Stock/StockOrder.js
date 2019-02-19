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
            stockData: [50.01, 10.01, 33.33],
            status: "Disconnected",
            open: false,
            text: '',
            chat: [],
            stockShareQuantity: '',
            stockQuantityValid: true,
            stockShareOrderValue: '',
        }

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
        console.log("User:",user)
        this.props.loadAccountInformation(user.uid)
        console.log("StockOrder - this.props.account",this.props.account)
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
        var user = firebase.auth().currentUser;
        console.log("User:",user)
        // stockOrderBuy = (userid,price,quantity,ticker)
        await this.props.stockOrderBuy(user.uid,this.state.stockData[this.state.stockData.length - 1],this.state.stockShareQuantity,this.props.stock[0].ticker)
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

    render() {
        const { loading } = this.props
        return (
            !loading && <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }} enabled>
                <Header />
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ width: "50%", fontSize: 10, paddingLeft: 10, color: "#21ce99", fontWeight: systemWeights.bold.fontWeight }}>SHARES OF {this.props.stock[0].ticker}</Text>
                        <TextInput maxLength={3} multiline={false} autoFocus placeholder="0" placeholderTextColor="grey" keyboardType='number-pad' style={{ fontWeight: systemWeights.bold.fontWeight, color: "white", width: "50%", fontSize: 25, textAlign: "right", paddingRight: 10 }}
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
                <View style={{ flex: 1, width: "80%" }}>
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.stockQuantityValid} title="Review" titleStyle={{ fontWeight: systemWeights.regular.fontWeight, color: '#0e0d0d' }} buttonStyle={{ borderRadius: 25, backgroundColor: "#21ce99", marginBottom: 20 }} onPress={() => this.stockOrderReview()}></Button>
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
})(StockOrder);