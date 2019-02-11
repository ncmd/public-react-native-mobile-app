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
    generatePassword,
    setSignupEmailAddress,
} from '../../redux/actions/actions_signup';
import { Actions } from 'react-native-router-flux';
import HeaderBase from '../../components/Header/HeaderBase';
import validate from 'validate.js'
import firebase from 'react-native-firebase';

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
            minimum: 5,
            message: 'Your password must be at least 5 characters'
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

class SignupStep1 extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            emailaddress: "",
            emailAddressValid: true,
            emailError: "",
        }
    }

    componentDidMount() {
        this.props.generatePassword()
        
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    continueButtonAction() {
        // this.onChangeEmailAddress(this.props.setSignupEmailAddress)

        if (this.state.emailAddressValid === false) {
            this.props.setSignupEmailAddress(this.state.emailaddress)
            this.signupNewAccount()
            console.log("continueButtonAction", this.props.signup)
            this.signOutAccount()
            
            Actions.signupstep2()
        }
    }

    signOutAccount = () => {
        firebase.auth().signOut();
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

    signupNewAccount() {
        
        firebase.auth().createUserWithEmailAndPassword(this.state.emailaddress, this.props.signup[0].password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    }

    renderIos() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Submit email address</Text>
                        <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We’ll send updates to this inbox.</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput autoFocus spellCheck={false} maxLength={40} onChangeText={(emailaddress) => this.onChangeEmailAddress(emailaddress)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                            <Text style={{ color: 'white' }}>{this.state.emailError}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, justifyContent: 'flex-end', alignItems: 'center' }}>
                        {/* <Button onPress={() => Actions.signupstep2()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} /> */}
                        <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.emailAddressValid} onPress={() => this.continueButtonAction()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
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
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Your email address</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We’ll send updates to this inbox.</Text>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput autoFocus spellCheck={false} onChangeText={(emailaddress) => this.onChangeEmailAddress(emailaddress)} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        <Text style={{ color: 'white' }}>{this.state.emailError}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.emailAddressValid} onPress={() => this.continueButtonAction()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
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

function mapStateToProps({ style, signup }) {
    return {
        style,
        signup,
    };
}

export default connect(mapStateToProps, {
    generatePassword,
    androidStyleLoad,
    iosStyleLoad,
    setSignupEmailAddress,
})(SignupStep1);