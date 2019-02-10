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

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';


class SignupStep2 extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            code: "",
            user: null,
            message: '',
            codeInput: '',
            phoneNumber: '+1',
            confirmResult: null,
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
                    phoneNumber: '+1',
                    confirmResult: null,
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

        if (Platform.OS === 'ios') {
            firebase.auth().signInWithPhoneNumber(phoneNumber)
                .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
                .catch(error => console.log(error));
        }
        if (Platform.OS === 'android') {
            firebase.auth().signInWithPhoneNumber(phoneNumber)
                .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
                .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
        }

    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
            confirmResult.confirm(codeInput)
                .then((user) => {
                    this.setState({ message: 'Code Confirmed!' });
                })
                .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
    }

    renderPhoneNumberInput() {
        const { phoneNumber } = this.state;

        return (
            <View style={{ padding: 25 }}>
                <Text>Enter phone number:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ phoneNumber: value })}
                    placeholder={'Phone number ... '}
                    value={phoneNumber}
                />
                <Button title="Sign In" color="green" onPress={this.signIn} />
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
            <View style={{ marginTop: 25, padding: 25 }}>
                <Text>Enter verification code below:</Text>
                <TextInput
                    autoFocus
                    style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                    onChangeText={value => this.setState({ codeInput: value })}
                    placeholder={'Code ... '}
                    value={codeInput}
                />
                <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
            </View>
        );
    }

    renderIos() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {user && (
                    <View
                        style={{
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#77dd77',
                            flex: 1,
                        }}
                    >
                        <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
                        <Text style={{ fontSize: 25 }}>Signed In!</Text>
                        <Text>{JSON.stringify(user)}</Text>
                        <Button title="Sign Out" color="red" onPress={this.signOut} />
                    </View>
                )}
            </View>
        );
    }

    renderAndroid() {
        const { user, confirmResult } = this.state;
        return (
            <View style={{ flex: 1 }}>

                {!user && !confirmResult && this.renderPhoneNumberInput()}

                {this.renderMessage()}

                {!user && confirmResult && this.renderVerificationCodeInput()}

                {user && (
                    <View
                        style={{
                            padding: 15,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#77dd77',
                            flex: 1,
                        }}
                    >
                        <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
                        <Text style={{ fontSize: 25 }}>Signed In!</Text>
                        <Text>{JSON.stringify(user)}</Text>
                        <Button title="Sign Out" color="red" onPress={this.signOut} />
                    </View>
                )}
            </View>
        );
    }


    // renderIos() {
    //     const { user, confirmResult } = this.state;
    //     return (
    //         <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
    //             <HeaderBase />
    //             <KeyboardAvoidingView behavior="padding" style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }} enabled>
    //                 <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
    //                     <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Verification code</Text>
    //                     <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We sent a code to your email address</Text>
    //                     <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
    //                         <TextInput maxLength={6} onChangeText={(code) => this.setState({ code })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="000000" placeholderTextColor="grey" keyboardType='number-pad' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
    //                     </View>
    //                 </View>
    //                 <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
    //                     <Button onPress={() => Actions.signupstep3()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
    //                     <Button title="Send new code" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
    //                 </View>
    //             </KeyboardAvoidingView>
    //         </View>
    //     );
    // }

    // renderAndroid() {
    //     const { user, confirmResult } = this.state;
    //     return (
    //         <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
    //             <HeaderBase />
    //             <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '70%', justifyContent: 'flex-start', alignItems: 'center' }}>
    //                 <Text style={{ color: 'white', fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>Verification code</Text>
    //                 <Text style={{ padding: 20, color: 'white', fontSize: 14, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}>We sent a code to your email address</Text>
    //                 <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
    //                     <TextInput maxLength={6} onChangeText={(code) => this.setState({ code })} autoComplete="none" autoCapitalize="none" multiline={false} placeholder="000000" placeholderTextColor="grey" keyboardType='number-pad' style={{ textAlign: "center", color: "#21ce99", width: "100%", fontSize: 20, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }}></TextInput>
    //                 </View>
    //             </View>
    //             <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '20%', justifyContent: 'flex-start', alignItems: 'center' }}>
    //                 <Button onPress={() => Actions.signupstep3()} title="Continue" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorPrimary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, padding: 5, elevation: 0, backgroundColor: this.props.style[0].ButtonBackgroundColorPrimary }} />
    //                 <Button title="Send new code" titleStyle={{ fontSize: this.props.style[0].ButtonTextSizePrimary, textAlign: "center", width: '80%', color: this.props.style[0].ButtonTextColorSecondary, fontFamily: this.props.style[0].TextFontFamilyRegularPrimary, fontWeight: this.props.style[0].TextFontWeightRegularPrimary }} raised={false} buttonStyle={{ borderRadius: this.props.style[0].ButtonBorderRadiusPrimary, borderColor: this.props.style[0].BorderColorPrimary, borderWidth: this.props.style[0].ButtonBorderWidthPrimary, marginTop: 10, padding: 5, elevation: 0, backgroundColor: "transparent" }} />
    //             </View>
    //         </View>
    //     );
    // }


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
        style, signup
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
})(SignupStep2);