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
    Animated,
} from 'react-native';
import Header from '../../components/Header/Header'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import { ClipPath, Defs, Rect } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights, robotoWeights, sanFranciscoWeights } from 'react-native-typography'
import { ButtonGroup, Button } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const timeSelectorButtonGroupValues = [<Text><Icon name="record" style={{ color: 'red' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y']
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
        strokeWidth={10}
        strokeLinejoin={'round'}
        stroke={'rgba(244,85,49,0.3)'}
    />
)

const ShadowUP = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={10}
        strokeLinejoin={'round'}
        stroke={'rgba(33,206,153,0.3)'}
    />
)

class Stock extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [13.12, 12.22, 11.93, 10.01, 11.05, 10.13, 9.12, 9.42, 9.33, 11.62, 11.72, 10.93],
            stockTimePickerValues: [<Text><Icon name="record" style={{ color: 'rgba(255,0,0,1)' }}></Icon>LIVE</Text>, '1D', '1W', '1M', '3M', '6M', '1Y'],
            stockTimePickerValuesToggle: false,
            fadeAnim: new Animated.Value(0),
            stockPerformance: '',
            stockVolume: 12023,
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

    renderAnimation() {
        let { fadeAnim } = this.state;
        return (
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
            >
                <Text><Icon name="record" style={{ color: 'rgba(255,0,0,1)' }}></Icon>LIVE</Text>,
            </Animated.View>
        )
    }

    componentDidMount() {

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

    // Live = 1hr | 15 sec = 240
    // 1Day = 24h | 5min = 288  
    // 1Week = 7d | 1hr = 168
    // 1Month = 30d | 1 day = 30
    // 3Months = 90d | 1 day = 90
    // 6Months = 180d | 1 day = 180
    // 1Year = 365d | 1 day = 365
    renderStockChartSelect(maxslice) {
        dayStockData = this.state.stockData.slice(this.state.stockData.length - { maxslice } + 1, this.state.stockData.length - 1);
        if (this.state.stockPerformance === 'up') {
            return (
                <View>
                    <LineChart
                        style={{ height: 300, backgroundColor: "#0e0d0d" }}
                        data={dayStockData}
                        animate={false}
                        svg={{ stroke: 'rgb(255,255,255)', strokeWidth: 2, strokeLinejoin: 'round' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <ShadowUP />
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
                <View style={{ height: '80%', marginBottom: 10, flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={(ref) => { this.myScrollView = ref; }}>
                        <View>
                            <View style={{ backgroundColor: "#0e0d0d", padding: 10 }}>
                                <Text style={{ color: 'white' }}>Connection Status:
                                <Text style={{ color: '#21ce99' }}> {this.state.status}</Text></Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 25, color: "white", backgroundColor: "#0e0d0d", paddingLeft: 25, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>
                                    hack_the_planet
                                </Text>
                                <Text style={{ fontSize: 35, color: "white", backgroundColor: "#0e0d0d", paddingLeft: 25, paddingTop: 5, paddingBottom: 5, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>
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
                            <Text style={{ paddingLeft: 25, paddingTop: 10, color: "white", fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>TODAY'S VOLUME</Text>
                            <NumberFormat
                                style={{ color: 'red' }}
                                value={this.state.stockVolume}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={''}
                                renderText={value => <Text style={{ paddingLeft: 25, color: "white", fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>{value}</Text>}
                            />
                        </View>
                        <View style={{ width: "50%" }}>
                            <Button title="TRADE" onPress={() => Actions.stockorder()} titleStyle={{ color: '#0e0d0d', fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }} style={{ width: "100%", paddingRight: 25, paddingTop: 10, paddingBottom: 10 }} buttonStyle={{ backgroundColor: "#21ce99" }} />
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
                textStyle={{ color: 'white', fontSize: 12, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}
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

export default Stock;