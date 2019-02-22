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
    Button as InvisibleUITestButton
} from 'react-native';
import { Button } from 'react-native-elements';
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MCIicon from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import { Actions } from 'react-native-router-flux'
import {
    accountLogin,
    accountLogout,
} from '../../redux/actions/actions_account';
import firebase from 'react-native-firebase';

class LandingMain extends React.Component {
    constructor() {
        super()
        this.unsubscriber = null
        this.state = {
            selectedIndex: 0,
        }
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
        // this.props.accountLogin()
        // this.props.accountLogout()
    }

    componentDidMount() {
        // this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
        //     console.log("componentDidMount user:", user)
        //     if (user !== null) {
        //         // this.props.accountLogin()
        //         console.log("LandingMain this.props.account this.props.account[0].loggedIn:", this.props.account.loggedIn)
        //         // this.setState({ isUserLogin:true });


        //     } else {
        //         // this.setState({ isUserLogin:false });
        //         // this.props.accountLogout()
        //         console.log("Router this.props.account this.props.account[0].loggedIn:",  this.props.account.loggedIn)
        //     }
        // });
    }



    render() {
        const { loading } = this.props;

        return (
            !loading && <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <StatusBar
                    backgroundColor="#0e0d0d"
                    barStyle="light-content"
                />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                    <MCIicon name="dog" style={{ fontSize: 70, color: 'white', padding: 20, color: this.props.style[0].ButtonBackgroundColorPrimary }}></MCIicon>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyBoldPrimary, fontWeight: this.props.style[0].TextFontWeightBoldPrimary }}>Welcome to publicreactnativeapp</Text>
                    <Text style={{ marginTop: 15, padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>A <Text style={{ fontStyle: 'italic', color: this.props.style[0].TextFontColorPrimary }}>distruptive</Text> trading app.</Text>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button onPress={() => Actions.signupmain()} title="Sign up" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Button onPress={() => Actions.loginmain()} title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
                    <InvisibleUITestButton title=" " accessibilityLabel="landingsignup" testID="landingsignup" onPress={() => Actions.signupmain()} style={{ height: 0, width: 0 }} />
                    <InvisibleUITestButton title=" " accessibilityLabel="landinglogin" testID="landinglogin" onPress={() => Actions.loginmain()} style={{ height: 0, width: 0 }} />
                </View>
            </View>
        );
    }
}

function mapStateToProps({ style, signup, account }) {
    return {
        style,
        signup,
        account,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    accountLogin,
    accountLogout,
})(LandingMain);