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
import {
    accountLogin,
} from '../../redux/actions/actions_account';
import { Actions } from 'react-native-router-flux';
import HeaderBase from '../../components/Header/HeaderBase';
import firebase from 'react-native-firebase';
import validate from 'validate.js'
import { setBottomNavigation } from '../../redux/actions/actions_bottom_navigation';

const constraints = {
    email: {
        format: {
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: 'address is not a valid format.',
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
    console.log(object, constraint)

    // Validate against the constraint and hold the error messages
    const result = validate(object, { [field]: constraint })
    console.log(object, constraint, result)

    // If there is an error message, return it!
    if (result) {
        // Return only the field error message if there are multiple
        return result[field][0]
    }
    return null
}

class LoginMain extends React.Component {
    constructor() {
        super()
        this.unsubscriber = null;
        this.state = {
            selectedIndex: 0,
            user: null,
            emailaddress: "",
            password: null,
            loginError: "",
            resetError: "",
            forgotpassword: true,
            emailError: "",
            passwordEmail: "",
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

    onChangeEmailAddress(email) {
        let emailError = validator('email', email)
        this.setState({
            emailError: emailError
        })
    }

    onChangePassword(password) {
        let passwordError = validator('password', password)
        this.setState({
            passwordError: passwordError,
        })
    }

    signInUser(emailaddress, password) {
        firebase.auth().signInWithEmailAndPassword(emailaddress, password).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({ loginError: "Email address or password is not valid.", forgotpassword: false })
            // ...
        }).then(
            this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
                this.setState({ user });
            }, () => {
                if (this.state.user !== null) {
                    this.props.accountLogin()
                    this.props.setBottomNavigation("portfolio")
                    Actions.basemain()
                }
            })
        );
    }

    sendResetPasswordEmail(emailaddress) {
        firebase.auth().sendPasswordResetEmail(emailaddress).then(() => {
            this.setState({
                loginError: null,
                resetError: "Sent reset email to " + emailaddress
            })
        }).catch((error) => {
            this.setState({
                loginError: null,
                resetError: error.message
            })
        });
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
        const { loading } = this.props;

        return (
            !loading && <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Log in to [App_Name]</Text>
                        <Text style={{ marginTop: 15, padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>A <Text style={{ fontStyle: 'italic', color: this.props.style[0].TextFontColorPrimary }}>distruptive</Text> trading app.</Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput spellCheck={false} autoFocus onChangeText={(emailaddress) => this.setState({ emailaddress })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                            <Text  style={{ color: 'white' }}> {this.state.emailError ? this.state.emailError : null}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <TextInput onChangeText={(password) => this.setState({ password })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey" secureTextEntry={true} keyboardType='default' style={{ paddingLeft: 10, paddingRight: 10, textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                            <Text style={{ color: 'white' }}>{this.state.loginError ? this.state.loginError : null}{this.state.resetError ? this.state.resetError : null}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Button onPress={() => this.signInUser(this.state.emailaddress, this.state.password)} title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                        <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)", borderColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.forgotpassword} onPress={() => this.sendResetPasswordEmail(this.state.emailaddress)} title="Forgot password" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }

    renderAndroid() {
        const { loading } = this.props;
        return (
            !loading && <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
                <HeaderBase />
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Log in to [App_Name]</Text>
                    <Text style={{ marginTop: 15, padding: 10, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>A <Text style={{ fontStyle: 'italic', color: this.props.style[0].TextFontColorPrimary }}>distruptive</Text> trading app.</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput spellCheck={false} autoFocus onChangeText={(emailaddress) => this.setState({ emailaddress })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Email address" placeholderTextColor="grey" keyboardType='email-address' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <TextInput onChangeText={(password) => this.setState({ password })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="Password" placeholderTextColor="grey" secureTextEntry={true} keyboardType='default' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                        <Text style={{ color: 'white' }}>{this.state.loginError ? this.state.loginError : null}{this.state.resetError ? this.state.resetError : null}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Button onPress={() => this.signInUser(this.state.emailaddress, this.state.password)} title="Log in" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
                    <Button disabledStyle={{ backgroundColor: "rgba(48, 45, 45,0.9)", borderColor: "rgba(48, 45, 45,0.9)" }} disabled={this.state.forgotpassword} onPress={() => this.sendResetPasswordEmail(this.state.emailaddress)} title="Forgot password" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
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

function mapStateToProps({ style, account, bottomnavigation }) {
    return {
        style,
        account,
        bottomnavigation
    };
}

export default connect(mapStateToProps, {
    accountLogin,
    androidStyleLoad,
    iosStyleLoad,
    setBottomNavigation,
})(LoginMain);