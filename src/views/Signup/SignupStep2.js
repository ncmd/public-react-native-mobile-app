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
    setSignupEmailAddress,
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

class SignupStep2 extends React.Component {
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
            Actions.signupstep3()
        }
    }

    onChangeEmailAddress(email) {
        let emailError = validator('email', email)
        if (emailError === "" || emailError === null) {
            this.setState({
                emailaddress: email,
                emailAddressValid: false,
                emailError: ""
            })
        } else {
            this.setState({
                emailaddress: email,
                emailError: emailError,
                emailAddressValid: true
            })
        }
    }

    updateAccountInformation() {
        var user = firebase.auth().currentUser;
        user.updateEmail(
            this.state.emailaddress
        ).then(() => {
            // Update successful.
            console.log("Update Account Info Successful")
            this.props.setSignupEmailAddress(this.state.emailaddress)
            Actions.signupstep3()

        }).catch((error) => {
            // An error happened.
            this.setState({
                AccountError: error.message
            })
            console.log("Update Account Info FAILED!", error.message)
        });
    }

    renderIos() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Set Email Address</Text>
                        <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We'll send updates to this inbox.</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput autoFocus autoComplete="none" spellCheck={false} onChangeText={(emailaddress) => this.onChangeEmailAddress(emailaddress)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                            <Text style={{ color: 'white' }}>{this.state.emailError}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ color: 'white' }}>{this.state.AccountError}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.emailAddressValid} onPress={() => this.updateAccountInformation()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
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
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Set Email Address</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We'll send updates to this inbox.</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput autoFocus  autoComplete="none" spellCheck={false} onChangeText={(emailaddress) => this.onChangeEmailAddress(emailaddress)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        <Text style={{ color: 'white' }}>{this.state.emailError}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ color: 'white' }}>{this.state.AccountError}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.emailAddressValid} onPress={() => this.updateAccountInformation()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
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
    setSignupEmailAddress,
})(SignupStep2);