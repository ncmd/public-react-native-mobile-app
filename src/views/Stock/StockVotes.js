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
    Modal,
    TouchableHighlight,
} from 'react-native';
import { LineChart, Path, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { Circle, G, Line, Rect, Text as SVGText } from 'react-native-svg'
import { Actions } from 'react-native-router-flux'
import { systemWeights } from 'react-native-typography'
import { ButtonGroup, Button, ListItem } from 'react-native-elements';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

class StockVotes extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            modalVisible: false,
            tableHead: ['User', 'Shares'],
            tableData: [
                ['jeffa', '321'],
                ['blowb', '293'],
                ['comeb', '200'],
                ['jackd', '172'],
            ],
            routes: [
                { key: 'performance', title: "Performance" },
                { key: 'positions', title: "Positions" },
                { key: 'watchlist', title: "Watchlist" },
            ],
            list: [
                {
                    key: 'a',
                    name: <Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>TERMS OF ENGAGEMENT</Text>,
                    subtitle: <Text style={{ fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>Yes: 53% | No: 47% - 2211 Comments</Text>,
                    stocktrend: [12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09, 10.55, 10.73, 10.65, 10.4, 10.32, 9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28],
                    decision: 'NOW OPEN'
                },
                {
                    key: 'b',
                    name: <Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>NO SHAVE NOVEMBER</Text>,
                    subtitle: <Text style={{ fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>Yes: 53% | No: 47% - 2211 Comments</Text>,
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    decision: 'REJECTED'
                },
                {
                    key: 'c',
                    name: <Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>BUY A PRESENT</Text>,
                    subtitle: <Text style={{ fontSize: 12, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>Yes: 53% | No: 47% - 2211 Comments</Text>,
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    decision: 'APPROVED'
                }
            ],
        }
    }

    componentDidMount() {

    }


    keyExtractor = (item, index) => {
        return index
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    renderItem = ({ item }) => {

        if (item.decision === 'NOW OPEN') {
            return (
                <ListItem
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    key={item.name}
                    title={item.name}
                    subtitle={item.subtitle}
                    containerStyle={{ backgroundColor: "#0e0d0d" }}
                    titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
                    leftElement={<Button title={item.decision} buttonStyle={{ width: 80, borderRadius: 5, backgroundColor: "#42a5f5" }} titleStyle={{ fontSize: 10, color: "#0e0d0d", fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}></Button>}
                    bottomDivider={true}
                    rightElement={<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <MIcon name="keyboard-arrow-right" style={{ fontSize: 20, color: '#42a5f5' }}></MIcon>
                    </View>}
                />
            )
        } else if (item.decision === 'APPROVED') {
            return (
                <ListItem
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    key={item.name}
                    title={item.name}
                    subtitle={item.subtitle}
                    containerStyle={{ backgroundColor: "#0e0d0d" }}
                    titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
                    leftElement={<Button title={item.decision} buttonStyle={{ width: 80, borderRadius: 5, backgroundColor: "#21ce99" }} titleStyle={{ fontSize: 10, color: "#0e0d0d", fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}></Button>}
                    bottomDivider={true}
                    rightElement={<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <MIcon name="keyboard-arrow-right" style={{ fontSize: 20, color: '#21ce99' }}></MIcon>
                    </View>}
                />
            )
        } else if (item.decision === 'REJECTED') {
            return (
                <ListItem
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                    key={item.name}
                    title={item.name}
                    subtitle={item.subtitle}
                    containerStyle={{ backgroundColor: "#0e0d0d" }}
                    titleStyle={{ fontSize: 14, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: "white" }}
                    leftElement={<Button title={item.decision} buttonStyle={{ width: 80, borderRadius: 5, backgroundColor: "#f45531" }} titleStyle={{ fontSize: 10, color: "#0e0d0d", fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}></Button>}
                    bottomDivider={true}
                    rightElement={<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <MIcon name="keyboard-arrow-right" style={{ fontSize: 20, color: '#f45531' }}></MIcon>
                    </View>}
                />
            )
        }
    }

    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
    }


    renderStockVotes() {
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(index)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>button</Text>
                </View>
            </TouchableOpacity>
        );


        return (
            <View style={[styles.scene, { backgroundColor: 'transparent' }]} >
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22, flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                        <Button
                            title={"Close"}
                            style={{ padding: 5 }}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                        </Button>
                        <Text style={{padding:5}}>Shareholder Approver Meeting</Text>
                        <Text style={{padding:5}}>Posted on January 5, 2019</Text>
                        <Text style={{padding:5}}>Description</Text>
                        <Text style={{padding:5}}>We the shareholders are glad that you're alive and well and we want to wish you some form of a 'Happy Birthday' but not in the traditional form of song and cake.  Instead, we wish you some percentage of a happy birthday based on how well we think you're doing at being the world's only publicly traded person. This will be a regular vote to determine how much support you have from your shareholder community: A yes is a vote of confidence that KmikeyM is a ship on the right course. A no vote is a warning that you're off the mark and we expect some changes.</Text>
                        <View style={{ backgroundColor: 'transparent', flex: 1, flexDirection: 'row' }}>
                            <View style={{ width: '50%', backgroundColor: 'transparent', padding: 5 }}>
                                <Text>Yes - 200000</Text>
                                <Table borderStyle={{ borderColor: 'transparent' }}>
                                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                    {
                                        state.tableData.map((rowData, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                {
                                                    rowData.map((cellData, cellIndex) => (
                                                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                    ))
                                                }
                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </View>
                            <View style={{ width: '50%', backgroundColor: 'transparent', padding: 5 }}>
                                <Text>No - 200000</Text>
                                <Table borderStyle={{ borderColor: 'transparent' }}>
                                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                                    {
                                        state.tableData.map((rowData, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                {
                                                    rowData.map((cellData, cellIndex) => (
                                                        <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text} />
                                                    ))
                                                }
                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </View>
                        </View>
                    </View>
                </Modal>
                <FlatList
                    data={this.state.list}
                    renderItem={this.renderItem}
                />
            </View>
        )
    }

    render() {
        return (
            this.renderStockVotes()
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default StockVotes;