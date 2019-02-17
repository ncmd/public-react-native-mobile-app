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
    TouchableOpacity,
    Animated,
} from 'react-native';
import HeaderBase from '../../components/Header/HeaderBase'
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button, ListItem } from 'react-native-elements';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import NavigationBase from '../../components/Navigation/NavigationBase'
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MCIicon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import PortfolioPerformance from './PortfolioPerformance';

const ShadowDOWN = ({ line }) => (
    <Path
        key={'shadow'}
        y={0}
        d={line}
        fill={'none'}
        strokeLinecap={'round'}
        strokeWidth={4}
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
        strokeWidth={4}
        strokeLinejoin={'round'}
        stroke={'rgba(33,206,153,0.4)'}
    />
)

class PortfolioMain extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            routes: [
                { key: 'performance', title: "Performance" },
                { key: 'positions', title: "Positions" },
                { key: 'watchlist', title: "Watchlist" },
            ],
            list: [
                {
                    key:'a',
                    name: 'TEAM1',
                    stocktrend: [12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09, 10.55, 10.73, 10.65, 10.4, 10.32, 9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28],
                    stockprice: '$10.28'
                },
                {
                    key:'b',
                    name: 'TEAM2',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$20.09'
                },
                {
                    key:'c',
                    name: 'TEAM3',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$30.09'
                },
                {
                    key:'d',
                    name: 'TEAM4',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$40.09'
                },
                {
                    key:'e',
                    name: 'TEAM5',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$50.09'
                },
                {
                    key:'f',
                    name: 'TEAM6',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$50.09'
                },
                {
                    key:'g',
                    name: 'TEAM7',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$16.09'
                },
                {
                    key:'h',
                    name: 'TEAM8',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '10.09'
                },
                {
                    key:'i',
                    name: 'FLEXI',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09'
                },
                {
                    key:'j',
                    name: 'GOOGL',
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    stockprice: '$10.09'
                }
            ],
        }
    }

    componentDidMount() {

    }


    keyExtractor = (item, index) => {
        return index
    }

    renderItem = ({ item }) => (
        <ListItem
            onPress={() => Actions.stockview()}
            key={item.name}
            title={item.name}
            containerStyle={{ backgroundColor: "#0e0d0d" }}
            titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
            rightElement={<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <LineChart
                    style={{ width: 190, marginLeft: -125, backgroundColor: "transparent" }}
                    data={item.stocktrend}
                    animate={false}
                    svg={{ stroke: 'rgb(33,206,153)', strokeWidth: 1, strokeLinejoin: 'round' }}
                    contentInset={{ top: 5, bottom: 5, left: 5, right: 5 }}
                    curve={shape.curveLinear}
                >
                    <ShadowUP />
                </LineChart>
                <Button title={item.stockprice} buttonStyle={{ width: 90, borderRadius: 5, backgroundColor: "#21ce99" }} titleStyle={{ fontSize: 14, color: "#0e0d0d", fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight }}></Button>
            </View>}
            bottomDivider={true}
        />
    )

    _handleIndexChange = index => this.setState({ index });

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? '#21ce99' : 'grey')
                        ),
                    });
                    return (
                        <TouchableOpacity
                            key={i} 
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <Animated.Text style={{ fontSize: 14, color: color, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>{route.title}</Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    FirstRoute = () => (
        <PortfolioPerformance />
    );

    SecondRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#0e0d0d' }]} >
            <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
            />
        </View>
    );

    ThirdRoute = () => (
        <View style={[styles.scene, { backgroundColor: '#0e0d0d' }]} >
            <FlatList
                data={this.state.list}
                renderItem={this.renderItem}
            />
        </View>
    );

    renderStockView() {
        return (
            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: "#0e0d0d", flexGrow: 1, flexDirection: 'column', justifyContent: 'flex-start' }} enabled>
                <HeaderBase />

                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        performance: this.FirstRoute,
                        positions: this.SecondRoute,
                        watchlist: this.ThirdRoute,
                    })}
                    onIndexChange={this._handleIndexChange}
                    renderTabBar={this._renderTabBar}
                />
            </KeyboardAvoidingView>
        )
    }

    render() {
        return (
            this.renderStockView()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "rgba(33,206,153,0.2)"
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
});

export default PortfolioMain;