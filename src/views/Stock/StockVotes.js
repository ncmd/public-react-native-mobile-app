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
    Image,
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
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';

class StockVotes extends React.Component {
    constructor() {
        super()
        this.state = {
            index: 0,
            modalVisible: false,
            tableHead: ['User', 'Shares'],
            tableData: [
                ['joe', '321'],
                ['zero', '293'],
                ['david', '200'],
                ['michael', '172'],
            ],
            routes: [
                { key: 'performance', title: "Performance" },
                { key: 'positions', title: "Positions" },
                { key: 'watchlist', title: "Watchlist" },
            ],
            list: [
                {
                    key: 'a',
                    name: "WHAT THE FUCK IS KUBERNETES?",
                    subtitle: "Yes: 53% | No: 47% - 2211 Comments",
                    stocktrend: [12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09, 10.55, 10.73, 10.65, 10.4, 10.32, 9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28],
                    decision: 'NOW OPEN'
                },
                {
                    key: 'b',
                    name: "DO YOU EVEN DEVOPS BRO?",
                    subtitle: "Yes: 53% | No: 47% - 2211 Comments",
                    stocktrend: [9.58, 9.51, 9.48, 9.34, 9.34, 10.67, 10.69, 10.9, 11.1, 11.32, 11.34, 11.44, 12.57, 12.87, 12.81, 12.87, 12.84, 12.06, 11.21, 10.25, 10.16, 9.99, 9.77, 12.43, 12.42, 11.72, 11.69, 11.58, 11.27, 12.82, 12.77, 12.65, 12.18, 11.66, 11.26, 10.11, 10.97, 10.74, 10.55, 10.73, 10.65, 10.4, 10.32, 10.94, 11.3, 11.4, 11.53, 11.87, 11.99, 12.45, 11.56, 11.86, 11.93, 11.98, 12.06, 12.2, 12.54, 12.54, 12.8, 12.9, 12.78, 12.28, 12.18, 12.09, 12, 11.67, 11.64, 11.49, 10.41, 10.14, 9.01, 9.08, 9.22, 9.49, 9.31, 9.27, 9.22, 9.24, 9.84, 9.96, 10, 10.01, 10.44, 10.55, 10.63, 10.74, 10.96, 9.83, 9.88, 9.99, 10.05, 10.1, 10.28, 9.16, 9.2, 9.33, 9.4, 9.94, 9.94, 10.09],
                    decision: 'REJECTED'
                },
                {
                    key: 'c',
                    name: "I LEAKED MY SECRETS ON GITHUB!",
                    subtitle: "Yes: 53% | No: 47% - 2211 Comments",
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
                    key={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    title={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    subtitle={<Text style={{ fontSize: 10, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>{item.subtitle}</Text>}
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
                    key={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    title={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    subtitle={<Text style={{ fontSize: 10, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>{item.subtitle}</Text>}
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
                    key={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    title={<Text style={{ fontSize: 12, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight, color: 'white' }}>{item.name}</Text>}
                    subtitle={<Text style={{ fontSize: 10, fontFamily: systemWeights.regular.fontFamily, fontWeight: systemWeights.regular.fontWeight, color: 'white' }}>{item.subtitle}</Text>}
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
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={(ref) => { this.myScrollView = ref; }}>
                        <View style={{ marginTop: 22, flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Button onPress={() => this.setModalVisible(!this.state.modalVisible)} title="Close" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                            <Text style={{ padding: 5, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>Shareholder Approver Meeting</Text>
                            <Text style={{ padding: 5 }}>Posted on February 13, 2019</Text>
                            <Text style={{ padding: 5 }}>What the fuck is Kubernetes?</Text>
                            <Image style={{width: 340, height:203}} source={{uri:'https://cdn-images-1.medium.com/max/1600/1*x19oVdiueoNINl-eZ6QUAg.png'}}/>
                            <Text style={{ padding: 5 }}>+$2,000.00</Text>
                            <Text style={{ padding: 5 }}>Implement a Kubernetes Cluster and redeploy docker Web and Database Docker services</Text>
                            <View style={{ backgroundColor: 'transparent', flex: 1, flexDirection: 'row' }}>
                                <View style={{ width: '50%', backgroundColor: 'transparent', padding: 5 }}>
                                    <Text style={{ fontSize: 20, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>Yes - 200000</Text>
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
                                    <Text style={{ fontSize: 20, fontFamily: systemWeights.bold.fontFamily, fontWeight: systemWeights.bold.fontWeight }}>No - 200000</Text>
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
                    </ScrollView>
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

function mapStateToProps({ style }) {
    return {
        style
    };
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 30, backgroundColor: '#808B97' },
    text: { margin: 2 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
})(StockVotes);