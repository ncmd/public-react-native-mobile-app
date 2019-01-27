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
import Header from '../../components/Header/Header'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

// const timeSelectorButtonGroupValues = [<Text><Icon name="record" style={{ color: 'red' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y']
// Live = 1hr | 15 sec = 240
// 1Day = 24h | 5min = 288  
// 1Week = 7d | 1hr = 168
// 1Month = 30d | 1 day = 30
// 3Months = 90d | 1 day = 90
// 6Months = 180d | 1 day = 180
// 1Year = 365d | 1 day = 365
// 5Years = 35d | 7d = 260
const timeSelectorMaxslice = [240, 288, 168, 30, 90, 180, 365]

const ShadowDOWN = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={8}
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
        strokeWidth={8}
        strokeLinejoin={'round'}
        stroke={'rgba(33,206,153,0.4)'}
    />
)

class StockView extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09, 10.55, 10.73, 10.65, 10.4, 10.32, 9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28],
            stockTimePickerValues: [<Text><Icon name="record" style={{ color: 'rgba(255,0,0,1)' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y'],
            stockTimePickerValuesToggle: false,
            deviceWidth: 200,
            stockPerformance: '',
            stockVolume: 12023,
            fingerTouchXCoordinate:50,
            status: "Disconnected",
            open: false,
            text: '',
            chat: []
        }
        this.updateIndex = this.updateIndex.bind(this)
        if (process.env.APP_ENV === 'production') {
            // This is for connecting to production websocket
            
        } else {
            // This is for connecting to local websocket
            if (Platform.OS === 'ios') {
                try{
                    this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/wsstock');
                }
                catch {
                    this.socket = new WebSocket('ws://127.0.0.1:8080/wsstock');
                }
                
            }
            if (Platform.OS === 'android') {
                try{
                    this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/wsstock');
                }
                catch{
                    this.socket = new WebSocket('ws://10.0.2.2:8080/wsstock');
                }
                
            }
        }
    }

    componentDidMount() {

        var thiswidth = Dimensions.get('window').width;
        this.setState({
            deviceWidth: thiswidth
        })

        setInterval(() => {

            // toggle between true/false
            // if true

            // if false
            if (this.state.stockTimePickerValuesToggle === false) {
                this.setState({
                    stockTimePickerValues: [<Text><Icon name="record" style={{ color: 'rgba(255,0,0,0.1)' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y'],
                    stockTimePickerValuesToggle: !this.state.stockTimePickerValuesToggle
                })
            } else {
                this.setState({
                    stockTimePickerValues: [<Text><Icon name="record" style={{ color: 'rgba(255,0,0,1)' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y'],
                    stockTimePickerValuesToggle: !this.state.stockTimePickerValuesToggle
                })
            }

        },
            // Define blinking time in milliseconds
            1000
        );

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
            if (this.state.stockData[0] > this.state.stockData[this.state.stockData.length - 1]) {
                this.setState({
                    stockPerformance: 'down'
                })
            } else {
                this.setState({
                    stockPerformance: 'up'
                })
            }
            if (prevStockData.length > 100) {
                prevStockData.shift()
                this.setState({
                    stockData: prevStockData,
                    stockVolume: this.state.stockVolume + 223
                })
            } else {
                this.setState({
                    stockData: prevStockData,
                    stockVolume: this.state.stockVolume + 223
                })
            }

        }
    }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    handlePress(evt){
        
        console.log(`x coord = ${evt.nativeEvent.locationX}`);

        var newValue = (evt.nativeEvent.locationX/this.state.deviceWidth)*100
        console.log(newValue)
        this.setState({
            fingerTouchXCoordinate: newValue
        })
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

        const HorizontalLine = (({ y }) => (
            <Line
                key={'zero-axis'}
                x1={'0%'}
                x2={'100%'}
                y1={y(this.state.stockData[0])}
                y2={y(this.state.stockData[0])}
                borderRadius={1}
                stroke={'white'}
                strokeWidth={2}
                strokeDasharray={"2,10"}
            />
        ))

        const Tooltip = ({ x, y }) => (
            <G
                x={x(this.state.fingerTouchXCoordinate)}
                key={'tooltip'}
            >
                <G x={this.state.fingerTouchXCoordinate}>
                    <Line
                        y1={10}
                        y2={y(-10)}
                        stroke={'grey'}
                        strokeWidth={2}
                    />
                    <Circle
                        cy={y(10)}
                        r={6}
                        stroke={'rgb(134, 65, 244)'}
                        strokeWidth={2}
                        fill={'white'}
                        onPress={(e) => this.handlePress(e)}
                    />
                </G>
            </G>
        )

        if (this.state.stockPerformance === 'up') {
            return (
                <View>
                    <LineChart
                        style={{ height: 300, backgroundColor: "#0e0d0d" }}
                        data={dayStockData}
                        animate={false}
                        svg={{ stroke: 'rgb(255,255,255)', strokeWidth: 2, strokeLinejoin: 'round' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={ shape.curveLinear }
                    >
                        <ShadowUP />
                        <HorizontalLine />
                        {/* <Tooltip /> */}
                    </LineChart>
                </View>
            )
        } else {
            return (
                <View>
                    <LineChart
                        style={{ height: 300, backgroundColor: "#0e0d0d" }}
                        data={dayStockData}
                        animate={false}
                        svg={{ stroke: 'rgb(255,255,255)', strokeWidth: 2, strokeLinejoin: 'round' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <ShadowDOWN />
                        <HorizontalLine />
                        {/* <Tooltip /> */}
                    </LineChart>
                </View>
            )
        }
    }

    renderStockChart(index) {
        return (
            this.renderStockChartSelect(timeSelectorMaxslice[index])
        )
    }

    renderStockPriceDifference() {
        let previousPrice = this.state.stockData[this.state.stockData.length - 2]
        let currentPrice = this.state.stockData[this.state.stockData.length - 1]
        let differencePrice = currentPrice - this.state.stockData[0]
        let differencePricePercentage = currentPrice / this.state.stockData[0] * 100
        if (differencePrice < 0) {
            return (
                <Text style={{ fontSize: 14, backgroundColor: "#0e0d0d", paddingLeft: 25, color: '#f45531', fontWeight: systemWeights.bold.fontWeight }}>
                    <Icon name="arrow-down-bold" style={{ fontSize: 20, color: '#f45531' }}></Icon> ${differencePrice.toFixed(2)} ({differencePricePercentage.toFixed(2)}%) <Text style={{ color: 'white' }}>Today</Text>
                </Text>
            )
        } else if (differencePrice > 0) {
            return (
                <Text style={{ fontSize: 14, backgroundColor: "#0e0d0d", paddingLeft: 25, color: '#21ce99', fontWeight: systemWeights.bold.fontWeight }}>
                    <Icon name="arrow-up-bold" style={{ fontSize: 20, color: '#21ce99' }}></Icon> ${differencePrice.toFixed(2)} ({differencePricePercentage.toFixed(2)}%) <Text style={{ color: 'white' }}>Today</Text>
                </Text>
            )
        }
    }

    renderStockView() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <Header headerPrice={parseFloat(this.state.stockData[this.state.stockData.length - 1]).toFixed(2)} headerTicker="APPL" />
                <View style={{ height: '80%', marginBottom: 10, flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={(ref) => { this.myScrollView = ref; }}>
                        <View>
                            <View style={{ backgroundColor: "#0e0d0d", padding: 10 }}>
                                <Text style={{ color: 'white' }}>Connection Status:
                                <Text style={{ color: '#21ce99' }}> {this.state.status}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 14, color: "white", backgroundColor: "#0e0d0d", paddingLeft: 25, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>
                                    APPL
                                </Text>
                                <Text style={{ fontSize: 25, color: "white", backgroundColor: "#0e0d0d", paddingLeft: 25, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>
                                    Apple
                                </Text>
                                <Text style={{ fontSize: 25, color: "white", backgroundColor: "#0e0d0d", paddingLeft: 25, paddingTop: 5, paddingBottom: 5, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>
                                    ${parseFloat(this.state.stockData[this.state.stockData.length - 1]).toFixed(2)}
                                </Text>
                                {this.renderStockPriceDifference()}
                            </View>
                            {this.renderStockChart(this.state.selectedIndex)}
                            {this.renderTimeSelectorButtonGroup()}
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0, flexDirection: 'row', height: '15%', backgroundColor: "#0e0d0d" }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ paddingLeft: 25, paddingTop: 10, color: "white", fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.regular.fontWeight }}>TODAY'S VOLUME</Text>
                            <NumberFormat
                                style={{ color: 'red' }}
                                value={this.state.stockVolume}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={''}
                                renderText={value => <Text style={{ paddingLeft: 25, color: "white", fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.regular.fontWeight }}>{value}</Text>}
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Button title="Trade" onPress={() => Actions.stockorder()} titleStyle={{ fontSize: 14, color: '#0e0d0d', fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight }} style={{ width: "100%", paddingRight: 25, paddingTop: 10, paddingBottom: 10 }} buttonStyle={{ backgroundColor: "#21ce99" }} />
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
                buttons={this.state.stockTimePickerValues}
                containerStyle={{ height: 30, backgroundColor: 'rgba(33,206,153,0.1)', borderRadius: 25 }}
                textStyle={{ color: 'white', fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}
                selectedButtonStyle={{ backgroundColor: '#21ce99' }}
                selectedTextStyle={{ color: 'white' }}
            />
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

export default StockView;