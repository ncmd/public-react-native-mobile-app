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
} from '../../redux/actions';

class LandingMain extends React.Component {
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
                <StatusBar
                    backgroundColor="#0e0d0d"
                    barStyle="light-content"
                />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                    <SLIicon name="eye" style={{ fontSize: 70, color: 'white', marginTop: 0 }}></SLIicon>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyBoldPrimary, fontWeight: this.props.style[0].TextFontWeightBoldPrimary }}>Welcome to [app_name] </Text>
                    <Text style={{ marginTop: 15, padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>A <Text style={{ fontStyle: 'italic', color:this.props.style[0].TextFontColorPrimary }}>distruptive</Text> trading app.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 15 }}>
                        <View style={{ borderRadius: 100 / 2, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].BorderWidthPrimary, width: 30, height: 30 }}><Text style={{ color: this.props.style[0].TextFontColorPrimary, textAlign: 'center', padding: 0, fontSize: 20, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>1</Text></View>
                        <Text style={{ padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary, padding: 5 }}>Create your profile</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 15 }}>
                        <View style={{ borderRadius: 100 / 2, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].BorderWidthPrimary, width: 30, height: 30 }}><Text style={{ color: this.props.style[0].TextFontColorPrimary, textAlign: 'center', padding: 0, fontSize: 20, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>2</Text></View>
                        <Text style={{ padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary, padding: 5 }}>Link payment method</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 15 }}>
                        <View style={{ borderRadius: 100 / 2, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].BorderWidthPrimary, width: 30, height: 30 }}><Text style={{ color: this.props.style[0].TextFontColorPrimary, textAlign: 'center', padding: 0, fontSize: 20, fontFamily: sanFranciscoWeights.bold.fontFamily, fontWeight: sanFranciscoWeights.bold.fontWeight }}>3</Text></View>
                        <Text style={{ padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary, padding: 5 }}>Verify your identity</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    <Button title="Sign up" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Button title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
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
})(LandingMain);