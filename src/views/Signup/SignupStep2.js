import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
    TouchableHighlight,
    FlatList,
    ScrollView,
    StatusBar,
} from 'react-native';
import { Button } from 'react-native-elements';
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import { systemWeights, robotoWeights, sanFranciscoWeights } from 'react-native-typography'
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import { Actions } from 'react-native-router-flux';
import HeaderBase from '../../components/Header/HeaderBase';

class SignupStep2 extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Subscription Details</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Cheaper than your monthly coffee habit</Text>
                    <View style={{ padding:10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', height:'70%', backgroundColor:'red',borderRadius: 16, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].BorderWidthPrimary, }}>
                        <View style={{ width: '100%', height: '70%' }}>
                            <Text style={{ color: this.props.style[0].TextFontColorPrimary, textAlign: 'center', padding: 10, fontSize: 20, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>
                                +2,000.00
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    <Button onPress={() => Actions.signupstep2()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Text style={{ fontSize: this.props.style[0].ButtonTextSizeSecondary, width: "80%", color: 'white', padding: 10, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Pay for only what you can afford.</Text>
                </View>
            </View>
        );
    }
}

function mapStateToProps({ style }) {
    return {
        style
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
})(SignupStep2);