import React, { Component } from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    Text,
    View,
    Platform,
} from 'react-native';
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import {
    setSignupPhoneNumber,
} from '../../redux/actions/actions_signup';
import { Actions } from 'react-native-router-flux';
import HeaderBase from '../../components/Header/HeaderBase';
import validate from 'validate.js'
import firebase from 'react-native-firebase';
import {
    accountLogout
} from '../../redux/actions/actions_account';

const constraints = {
    email: {
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'example: example@gmail.com',
        },
        presence: {
            message: "Cannot be blank."
        },
        email: {
            message: 'address does not exist!'
        }
    },
    password: {
        presence: {
            message: "Cannot be blank."
        },
        length: {
            minimum: 6,
            message: 'must be at least 6 characters.'
        }
    }
}

const validator = (field, value) => {
    // Creates an object based on the field name and field value
    // e.g. let object = {email: 'email@example.com'}
    let object = {}
    object[field] = value

    let constraint = constraints[field]
    // console.log(object, constraint)

    // Validate against the constraint and hold the error messages
    const result = validate(object, { [field]: constraint })
    // console.log(object, constraint, result)

    // If there is an error message, return it!
    if (result) {
        // Return only the field error message if there are multiple
        return result[field][0]
    }
    return null
}

class SignupStep3 extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            emailaddress: "",
            emailaddresserror: true,
            emailError: "",
            password: "",
            passwordError: "",
            passwordValid: false,
            emailAddressValid: true,
            AccountError: ""
        }
    }

    componentDidMount() {
        console.log(this.props.signup)
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    continueButtonAction() {
        if (this.state.emailaddresserror === false) {
            Actions.signupstep4()
        }
    }

    updateAccountInformation() {
        var user = firebase.auth().currentUser;
        user.updateEmail(
            "cchong.vise@gmail.com"
        ).then(() => {
            // Update successful.
            console.log("Update Account Info Successful")
            Actions.signupstep4()
        }).catch((error) => {
            // An error happened.
            console.log("Update Account Info FAILED!", error)
        });
        // Actions.signupstep4()
    }

    onChangePassword(password) {
        console.log(this.props.signup)
        this.setState({
            password: password
        }, () => {
            let passwordError = validator('password', password)
            console.log(passwordError)
            if (passwordError === undefined || passwordError === null) {
                this.setState({
                    passwordError: "",
                    passwordValid: false,
                })
            } else {
                this.setState({
                    passwordError: passwordError,
                    passwordValid: true
                })
                console.log(passwordError)
            }
        })
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    setUserPassword(password) {
        console.log("this.props.signup:", this.props.signup)
        let passwordError = validator('password', password)
        if (passwordError === "" || passwordError === null) {
            var user = firebase.auth().currentUser;
            user.updatePassword(password).then(() => {
                Actions.signupstep4()
                // Update successful.
                console.log("Password Changed!")
            }).catch((error) => {
                this.setState({
                    passwordError: error.message
                })
                // An error happened.
            });
        }
    }

    renderIos() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Set Password</Text>
                        <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>You can change this password in Account settings.</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput autoFocus spellCheck={false} onChangeText={(password) => this.onChangePassword(password)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey"secureTextEntry={true} keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                            <Text style={{ color: 'white' }}>{this.state.passwordError}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ color: 'white' }}>{this.state.AccountError}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.passwordValid} onPress={() => this.setUserPassword(this.state.password)} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                        <Text style={{ fontSize: 12, width: "80%", color: 'white', padding: 10, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We’ll never share your email address.</Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

    renderAndroid() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '60%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Set Password</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>You can change this password in Account settings.</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput autoFocus spellCheck={false} onChangeText={(password) => this.onChangePassword(password)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey" secureTextEntry={true} keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        <Text style={{ color: 'white' }}>{this.state.passwordError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ color: 'white' }}>{this.state.AccountError}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.passwordValid} onPress={() => this.setUserPassword(this.state.password)} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Text style={{ fontSize: 12, width: "80%", color: 'white', padding: 10, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We’ll never share your email address.</Text>
                </View>
            </View>
        )
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

function mapStateToProps({ style, signup,account }) {
    return {
        style,
        signup,
        account,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    setSignupPhoneNumber,
})(SignupStep3);