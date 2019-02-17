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
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation'
class StockOrderReview extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            stockData: [50, 10, 33],
            status: "Disconnected",
            open: false,
            text: '',
            chat: [],
            stockShareQuantity: '',
            stockQuantityValid: true,
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

    onChangeStockShareQuantity(quantity) {
        this.setState({ stockShareQuantity: quantity },() => {
            if (this.state.stockShareQuantity.length > 0){
                this.setState({ stockQuantityValid: false })
            } else {
                this.setState({ stockQuantityValid: true })
            }
        })
    }

    goToPortfolio(){
        this.props.setBottomNavigation("portfolio")
        Actions.basemain()
    }

    render() {
        const { loading } = this.props
        return (
            !loading && <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }} enabled>
                <Header />
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1 }}>
                    <View style={{ padding: 13, flex: 0, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{fontSize: 23, color: "#21ce99", fontWeight: systemWeights.bold.fontWeight }}>Your order was submitted!</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 1, width: "80%" }}>
                    <Button title="Back to Portfolio" titleStyle={{ fontSize:15,fontWeight: systemWeights.regular.fontWeight, color: '#0e0d0d' }} buttonStyle={{ borderRadius: 25, backgroundColor: "#21ce99", marginBottom: 20 }} onPress={() => this.goToPortfolio()}></Button>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps({ style, stock }) {
    return {
        style,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    setBottomNavigation,
})(StockOrderReview);