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
import validate from 'validate.js'
import {
    setSignupPhoneNumber,
} from '../../redux/actions/actions_signup';
import {
    accountLogout
} from '../../redux/actions/actions_account';

const constraints = {
    phone: {
        format: {
            pattern: /^[\+]?[0-9]{3}[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{5}$/im,
            message: 'example: +18003334444',
        },
        presence: {
            message: "Cannot be blank."
        },
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
            code: "",
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '',
            confirmResult: null,
            phoneNumberValid: true,
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }

        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user.toJSON() });
            } else {
                // User has been signed out, reset the state
                this.setState({
                    user: null,
                    message: '',
                    codeInput: '',
                    phoneNumber: '',
                    confirmResult: null,
                    phoneNumberError: "",
                });
            }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }


    sendVerificationEmail() {
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function () {
            // Email sent.
        }).catch(function (error) {
            // An error happened.
        });
    }

    signIn = () => {
        const { phoneNumber } = this.state;
        this.setState({ message: 'Sending code ...' });
        this.props.setSignupPhoneNumber("+1" + phoneNumber)
        if (Platform.OS === 'ios') {
            firebase.auth().signInWithPhoneNumber("+1" + phoneNumber)
                .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
                .catch(error => this.setState({ message: "Phone Number format is incorrect or not a valid phone number." }));
        }
        if (Platform.OS === 'android') {
            firebase.auth().signInWithPhoneNumber("+1" + phoneNumber)
                .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
                .catch(error => this.setState({ message: "Phone Number format is incorrect or not a valid phone number." }));
        }

    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!' });
                    Actions.signupstep2()
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    }

    onChangePhoneNumber(phonenumber) {
        this.props.setSignupPhoneNumber("+1" + phonenumber)
        this.setState({
            phoneNumber: phonenumber
        }, () => {
            let phoneNumberError = validator('phone', "+1" + phonenumber)
            if (phoneNumberError === undefined || phoneNumberError === null) {
                this.setState({
                    phoneNumberError: "",
                    phoneNumberValid: false,
                })
            } else {
                this.setState({
                    phoneNumberError: phoneNumberError,
                    phoneNumberValid: true
                })
                console.log(phoneNumberError)
            }
        })
    }

    renderPhoneNumberInput() {
        const { phoneNumber, loading } = this.state;

        return (
            <View >
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Enter Phone Number</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>{this.renderMessage()}</Text>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: "100%", flex: 1, flexDirection: "row", alignItems: "center" }}>
                            <Text style={{ textAlign: "center", color: "#21ce99", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>+1</Text>
                            <TextInput
                                autoFocus
                                maxLength={10}
                                onChangeText={(phonenumber) => this.onChangePhoneNumber(phonenumber)}
                                placeholder={'8003334444'}
                                placeholderTextColor="grey"
                                value={this.state.phoneNumber}
                                keyboardType='number-pad' style={{ textAlign: "center", color: "#21ce99", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}
                            />
                        </View>
                        <View style={{ width: "100%" }}>
                            <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>{this.state.phoneNumberError}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.phoneNumberValid} onPress={() => this.signIn()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                </View>
            </View>

        );
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        );
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
            <View >
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Enter Verification Code</Text>
                    <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>{this.renderMessage()}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <View style={{ marginTop: 25, padding: 25 }}>
                            <Text>Enter verification code below:</Text>
                            <TextInput
                                autoFocus
                                maxLength={6}
                                placeholderTextColor="grey"
                                keyboardType='number-pad' style={{ height: 50, marginTop: 15, marginBottom: 15, textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}
                                onChangeText={value => this.setState({ codeInput: value })}
                                placeholder={'000000'}
                                value={codeInput}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button onPress={() => this.confirmCode()} title="Verify" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Button onPress={() => this.signIn()} title="Send new code" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
                </View>
            </View>
        );
    }

    renderIos() {
        const { user, confirmResult, loading } = this.state;
        return (
            !loading && <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    {!user && !confirmResult && this.renderPhoneNumberInput()}
                    {!user && confirmResult && this.renderVerificationCodeInput()}
                </KeyboardAvoidingView>
            </View>
        );
    }

    renderAndroid() {
        const { user, confirmResult, loading } = this.state;
        return (
            !loading && <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                {!user && !confirmResult && this.renderPhoneNumberInput()}
                {!user && confirmResult && this.renderVerificationCodeInput()}
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

function mapStateToProps({ style, signup, account }) {
    return {
        style, signup, account
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    setSignupPhoneNumber,
})(SignupStep1);