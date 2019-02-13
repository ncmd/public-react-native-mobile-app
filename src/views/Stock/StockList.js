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
import Header from '../../components/Header/HeaderStockView'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBase from '../../components/Navigation/NavigationBase'
import { connect } from 'react-redux';
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation';

class StockList extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
    }

    renderStockList() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <Header headerPrice={parseFloat(this.state.stockData[this.state.stockData.length - 1]).toFixed(2)} headerTicker="APPL" />
                <View style={{ height: '80%', marginBottom: 10, flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={(ref) => { this.myScrollView = ref; }}>
                       <Text>Hello</Text>
                    </ScrollView>
                </View>
                <NavigationBase/>
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            this.renderStockList()
        );
    }
}

function mapStateToProps({ bottomnavigation }) {
    return {
      bottomnavigation
    };
  }
  
  export default connect(mapStateToProps, {
    setBottomNavigation
  })(StockList);
