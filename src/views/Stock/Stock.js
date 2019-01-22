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
} from 'react-native';
import Header from '../../components/Header/Header'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import { Circle, G, Line, Rect } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button } from 'react-native-elements';

const timeSelectorButtonGroupValues = ['LIVE', '1D', '1W', '1M', '3M', '6M', '1Y', '5Y']
// Live = 1hr | 15 sec = 240
// 1Day = 24h | 5min = 288  
// 1Week = 7d | 1hr = 168
// 1Month = 30d | 1 day = 30
// 3Months = 90d | 1 day = 90
// 6Months = 180d | 1 day = 180
// 1Year = 365d | 1 day = 365
// 5Years = 35d | 7d = 260
const timeSelectorMaxslice = [240, 288, 168, 30, 90, 180, 365, 260]

const Shadow = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={15}
        strokeLinejoin={'round'}
        stroke={'rgba(33,206,153,0.2)'}
    />
)

class Stock extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [10.12, 10.22, 9.93, 10.01, 10.05, 10.13, 10.12, 10.42, 10.33, 10.62, 10.72, 10.93],
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
            prevStockData.push(parseFloat(e.data))
            if (prevStockData.length > 100) {
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

    // Live = 1hr | 15 sec = 240
    // 1Day = 24h | 5min = 288  
    // 1Week = 7d | 1hr = 168
    // 1Month = 30d | 1 day = 30
    // 3Months = 90d | 1 day = 90
    // 6Months = 180d | 1 day = 180
    // 1Year = 365d | 1 day = 365
    renderStockChartSelect(maxslice) {
        dayStockData = this.state.stockData.slice(this.state.stockData.length - { maxslice } + 1, this.state.stockData.length - 1);
        return (
            <View>
                <LineChart
                    style={{ height: 300,backgroundColor:"#0e0d0d" }}
                    data={dayStockData}
                    animate={false}
                    
                    svg={{ stroke: 'rgb(255,255,255)',strokeWidth:4,strokeLinejoin:'round'}}
                    contentInset={{ top: 20, bottom: 20 }}
                >
                    <Shadow />
                </LineChart>
            </View>
        )
    }

    renderStockChart(index) {
        return (
            this.renderStockChartSelect(timeSelectorMaxslice[index])
        )
    }

    renderStockPriceDifference() {
        let previousPrice = this.state.stockData[this.state.stockData.length - 2]
        let currentPrice = this.state.stockData[this.state.stockData.length - 1]
        let differencePrice = currentPrice - previousPrice
        if (differencePrice < 0) {
            return (
                <Text style={{ fontSize: 15,backgroundColor:"#0e0d0d", paddingLeft: 10, color: '#f45531', fontWeight: systemWeights.bold.fontWeight }}>
                    DOWN ${differencePrice.toFixed(2)}(2.84%) Today
                </Text>
            )
        } else if (differencePrice > 0) {
            return (
                <Text style={{ fontSize: 15,backgroundColor:"#0e0d0d", paddingLeft: 10, color: '#21ce99', fontWeight: systemWeights.bold.fontWeight }}>
                    UP ${differencePrice.toFixed(2)}(2.84%) Today
                </Text>
            )
        }
    }

    renderStockView() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1,backgroundColor:"#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <View style={{ height: '80%', marginBottom: 10, flex:1}}>
                    <ScrollView contentContainerStyle={{ flexGrow:1}} ref={(ref) => { this.myScrollView = ref; }}>
                        <View>
                            <View style={{ backgroundColor: "#0e0d0d",padding:10 }}>
                                <Text style={{ color: 'white' }}>Connection Status:
                                <Text style={{ color: '#21ce99' }}> {this.state.status}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 30,color:"white",backgroundColor:"#0e0d0d", paddingLeft: 10, fontWeight: systemWeights.thin.fontWeight }}>
                                    Username
                                </Text>
                                <Text style={{ fontSize: 35,color:"white",backgroundColor:"#0e0d0d", padding: 5 }}>
                                    ${this.state.stockData[this.state.stockData.length - 1]}
                                </Text>
                                {this.renderStockPriceDifference()}
                            </View>
                            {this.renderStockChart(this.state.selectedIndex)}
                            {this.renderTimeSelectorButtonGroup()}
                        </View>
                    </ScrollView>
                </View>
                
                <View style={{ flex: 0, flexDirection: 'row',height: '20%',backgroundColor:"#0e0d0d" }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ paddingLeft: 10, paddingTop: 10,color:"white" }}>TODAY'S VOLUME</Text>
                            <Text style={{ paddingLeft: 10,color:"white" }}>123,234,222</Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Button title="Buy" onPress={() => Actions.stockorder()} style={{ width: "100%", padding: 10 }} buttonStyle={{ backgroundColor: "#21ce99" }}>Buy Stock</Button>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }

    renderTimeSelectorButtonGroup() {
        const { selectedIndex } = this.state

        return (
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={timeSelectorButtonGroupValues}
                containerStyle={{ height: 25 }}
            />
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

export default Stock;