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
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import { Circle, G, Line, Rect } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'

const timeButtonGroupValues = ['LIVE', '1D', '1W', '1M', '1Y', 'ALL']

const Shadow = ({ line }) => (
    <Path
        key={'shadow'}
        y={2}
        d={line}
        fill={'none'}
        strokeWidth={4}
        stroke={'rgba(33,206,153,0.2)'}
    />
)

class Stock extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [50, 10, 33],
            status: "Disconnected",
            open: false,
            text: '',
            chat: []
        }
        this.updateIndex = this.updateIndex.bind(this)
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

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    renderButtonAdd() {
        this.sets
    }

    renderStockChart() {

        return (
            <View>
                <LineChart
                    style={{ height: 200 }}
                    data={this.state.stockData}
                    animate={true}
                    animationDuration={100}
                    svg={{ stroke: 'rgb(33,206,153)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Grid />
                    <Shadow />
                </LineChart>
            </View>
        )
    }

    renderStockPriceDifference() {
        let previousPrice = this.state.stockData[this.state.stockData.length - 2]
        let currentPrice = this.state.stockData[this.state.stockData.length - 1]
        let differencePrice = currentPrice - previousPrice
        if (differencePrice < 0) {
            return (
                <Text style={{ fontSize: 15, paddingLeft:10 , color:'#f45531',  fontWeight:systemWeights.bold.fontWeight}}>
                    DOWN ${differencePrice}(2.84%) Today
                </Text>
            )
        } else if (differencePrice > 0) {
            return (
                <Text style={{ fontSize: 15, paddingLeft:10 , color:'#21ce99',  fontWeight:systemWeights.bold.fontWeight}}>
                    UP ${differencePrice}(2.84%) Today
                </Text>
            )
        }
    }

    renderStockView() {
        return (
            <View>
                {/* <Header headerText={'Stock Name'} /> */}
                <View style={{ height: 25, backgroundColor: "#0e0d0d" }}>
                    <Text style={{ color: 'white' }}>Connection Status:
                    <Text style={{ color: '#21ce99' }}>{this.state.status}</Text></Text>
                </View>
                <View>
                    <Text style={{fontSize:30,paddingLeft:10, fontWeight:systemWeights.thin.fontWeight}}>
                        Username
                    </Text>
                    <Text style={{ fontSize: 35, padding:5 }}>
                        ${this.state.stockData[this.state.stockData.length - 1]}
                    </Text>
                    {this.renderStockPriceDifference()}
                </View>
                {this.renderStockChart()}
                <Button title="Order" onPress={() => Actions.stockorder()}>Order Stock</Button>
            </View>
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

export default Stock;