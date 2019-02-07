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
import firebase from 'react-native-firebase';

class LoginMain extends React.Component {
    constructor() {
        super()
        this.unsubscriber = null;
        this.state = {
            selectedIndex: 0,
            user: null,
            emailaddress: "",
            password: "",
            loginerror: "",
        }
    }

    componentDidMount() {
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });

        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    componentWillUnmount() {
        if (this.unsubscriber) {
            this.unsubscriber();
        }
    }

    signInUser(emailaddress, password) {
        firebase.auth().signInWithEmailAndPassword(emailaddress, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ loginerror: errorMessage })
            // ...
        }).then(
            this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
                this.setState({ user });
            }, () => {
                if (this.state.user !== null) {
                    Actions.basemain()
                }
            })

        );
    }

    renderIos() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Log in to [App_Name]</Text>
                        <Text style={{ marginTop: 15, padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>A <Text style={{ fontStyle: 'italic', color: this.props.style[0].TextFontColorPrimary }}>distruptive</Text> trading app.</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput onChangeText={(emailaddress) => this.setState({ emailaddress })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput onChangeText={(password) => this.setState({ password })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey" secureTextEntry={true} keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ color: 'white' }}>{this.state.loginerror}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Button onPress={() => this.signInUser(this.state.emailaddress, this.state.password)} title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                        <Button onPress={() => Actions.basemain()} title="Reset Password" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }

    renderAndroid() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Log in to [App_Name]</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Creating an account takes about 4 minutes.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput onChangeText={(emailaddress) => this.setState({ emailaddress })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput onChangeText={(password) => this.setState({ password })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey" secureTextEntry={true} keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ color: 'white' }}>{this.state.loginerror}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button onPress={() => this.signInUser(this.state.emailaddress, this.state.password)} title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Button onPress={() => Actions.basemain()} title="Reset Password" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
                </View>
            </View>
        );
    }

    render() {
        if (Platform.OS === 'ios') {
            return this.renderIos()
        }
        if (Platform.OS === 'android') {
            return this.renderAndroid()
        }

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
})(LoginMain);