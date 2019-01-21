import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
    Button,
    FlatList,
    ScrollView,
} from 'react-native';
import Header from '../../components/Header/Header'

class StockOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [50, 10, 33],
            status: "Disconnected",
            open: false,
            text: '',
            chat: [],
            stockShareQuantity:'',
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

    render() {
        return (
            <View style={{backgroundColor:"#0e0d0d", height:'50%'}}>
                <View style={{height:"10%"}}/>
                <View style={{height:"10%", flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{width:"50%", fontSize: 15, paddingLeft:10, color:"#21ce99"}}>SHARES OF @USERNAME</Text>
                    <TextInput multiline={false} placeholder="0" placeholderTextColor="grey" keyboardType='number-pad' style={{color:"#21ce99",width:"50%", fontSize: 30, textAlign:"right",paddingRight:10}} onChangeText={(stockShareQuantity) => this.setState({stockShareQuantity})}>{this.state.stockShareQuantity}</TextInput>
                </View>
                <View style={{height:"5%", flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{width:"50%", fontSize: 20, color:"#21ce99", paddingLeft:10}}>MARKET PRICE</Text>
                    <Text style={{width:"50%", fontSize: 20, color:"#21ce99", textAlign:"right",paddingRight:10}}>$10.00</Text>
                </View>
                <View style={{height:"5%", flex:1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{width:"50%", fontSize: 20, color:"#21ce99", paddingLeft:10}}>ESTIMATED COST</Text>
                    <Text numberOfLines={1} style={{width:"50%", fontSize: 20, color:"#21ce99", textAlign:"right",paddingRight:10}}>${this.state.stockShareQuantity*10}</Text>
                </View>
                <View style={{height:"20%"}}/>
                <View>
                    <Button title="reviewButton" style={{backgroundColor:"#21ce99"}} onPress={() => Actions.stockreview()}>Review</Button>
                </View>
            </View>
        );
    }
}

export default StockOrder;