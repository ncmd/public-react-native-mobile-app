import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-native-elements';
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


const buttons = ['LIVE', '1D', '1W', '1M', '1Y', 'ALL']

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
        if (process.env.APP_ENV === 'production'){
            this.socket = new WebSocket('wss://public-go-websockets-prod.herokuapp.com/wsstock');
        } else {
            if (Platform.OS === 'ios') {
                this.socket = new WebSocket('ws://127.0.0.1:8080/wsstock');
            }
            if (Platform.OS === 'android'){
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
          prevStockData.push(this.state.stockData[prevStockData.length-1]+20)
          this.setState({
              stockData:prevStockData
          })
          
        }
      }

    updateIndex(selectedIndex) {
        this.setState({ selectedIndex })
    }

    renderStockView(){
        const { selectedIndex } = this.state
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

        return(
            <View>
                <Header headerText={'Stock Name'} />
                <View style={{ height: 25 }}>
                    <Text style={{ color: 'white' }}>Connection Status: <Text style={{ color: '#66D9EF' }}>{this.state.status}</Text></Text>
                </View>
                <View>
                    <Text style={{ fontSize: 45 }}>
                        $123.45
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                        +$3.23(2.84%) Today
                    </Text>
                </View>
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
                <View>
                    <ButtonGroup
                        onPress={this.updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }}
                    />
                </View>
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