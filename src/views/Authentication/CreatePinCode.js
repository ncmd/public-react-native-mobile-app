import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    NativeModules,
    Platform,
    ImageBackground
} from 'react-native';
import { Button } from 'react-native-elements';
import { systemWeights, robotoWeights, sanFranciscoWeights } from 'react-native-typography'
import TouchID from 'react-native-touch-id'
import Svg, { Path, Circle, Rect, G } from 'react-native-svg'
import SLIicon from 'react-native-vector-icons/SimpleLineIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Actions } from 'react-native-router-flux'
import PINCode from '@haskkor/react-native-pincode'

// Reference: https://medium.com/react-native-training/integrate-touch-id-and-face-id-to-your-react-native-app-707e7db17edc

const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21ce99',
        width: '100%',
        height: '100%',
        flex: 1
    },
    interactiveContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        transform: [{ rotate: '35deg' }],
        flex: 1
    },
    btn: {
        borderRadius: 5,
        width: '30%',
        marginTop: 300,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#ffffff'
    }
});


class CreatePinCode extends React.Component {

    constructor() {
        super()
        this.state = {
            biometryType: null,
            unlockMessage: "Enable Fingerprint or Face Unlock to Login"
        };
    }

    componentDidMount() {

        TouchID.isSupported()
            .then(biometryType => {
                if (biometryType === 'TouchID') {
                    this.setState({
                        biometryType: 'Touch ID',
                        unlockMessage: "Unlock with Touch ID"
                    });
                    this.clickHandler()
                    // Touch ID is supported on iOS
                } else if (biometryType === 'FaceID') {
                    this.setState({
                        biometryType: 'Face ID',
                        unlockMessage: "Unlock with Face ID"
                    });
                    this.clickHandler()
                    // Face ID is supported on iOS
                } else if (biometryType === true) {
                    this.setState({
                        biometryType: 'Fingerprint Authentication',
                        unlockMessage: "Unlock with Fingerprint Authentication"
                    });
                    this.clickHandler()
                    // Touch ID is supported on Android
                } else {
                    this.setState({
                        biometryType: null,
                        unlockMessage: "Enable Fingerprint or Face Unlock to Login"
                    });
                    this.clickHandler()
                    // Touch ID is supported on Android
                }
            })
            .catch(error => {
                this.setState({ biometryType: 'Enable Fingerprint/Face Unlock to Login' });
                // User's device does not support Touch ID (or Face ID)
                // This case is also triggered if users have not enabled Touch ID on their device
            });
    }


    logoutConfirmation() {
        Alert.alert(
            "Are you sure you want to log out?",
            [
                { text: 'Yes', onPress: () => console.log('OK Pressed') },
                { text: 'No', onPress: () => console.log('OK Pressed'), style: "cancel" }
            ],
            { cancelable: false }
        )
    }

    clickHandler() {
        if (Platform.OS === 'ios') {
            TouchID.isSupported()
                .then(authenticate)
                .catch(error => {
                    Alert.alert(
                        error.message,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                });
        } else if (Platform.OS === 'android') {
            TouchID.isSupported()
                .then(authenticate)
                .catch(error => {
                    Alert.alert(
                        error.message,
                        [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    )
                });
        }
    }

    render() {
        // Initializing Props from ./redux/reducers/stylesReducer.js
        const { loading } = this.props;

        return (
            !loading && <View style={styles.container}>
                <ImageBackground
                    source={require('./pattern.png')}
                    style={{ width: 1000, height: 1000, transform: [{ rotate: '-35deg' }] }}
                    resizeMode="repeat"
                >
                    <View style={styles.interactiveContainer}>
                        <SLIicon name="eye" style={{ padding: 20, fontSize: 70, color: 'white' }} />
                        <PINCode status={'choose'}
                            stylePinCodeColorTitle="white"
                            subtitleChoose={' '}
                            stylePinCodeTextTitle={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }} />
                        {/* <TouchableHighlight
                            style={styles.btn}
                            onPress={this.clickHandler}
                            underlayColor="rgba(255,255,255,0.6)"
                            activeOpacity={1}
                        >
                            <Text style={{
                                color: '#21ce99',
                                textAlign: 'center',
                                width: '100%',
                                fontFamily: sanFranciscoWeights.regular.fontFamily,
                                fontWeight: sanFranciscoWeights.regular.fontWeight
                            }}>
                                {`${this.state.unlockMessage}`}
                            </Text>
                        </TouchableHighlight>
                        <Button title="Log Out" onPress={() => this.logoutConfirmation} titleStyle={{ textAlign: "center", width: '100%', color: 'white', fontFamily: sanFranciscoWeights.regular.fontFamily, fontWeight: sanFranciscoWeights.regular.fontWeight }} raised={false} buttonStyle={{ marginTop: 15, padding: 10, elevation: 0, backgroundColor: "transparent" }} /> */}
                    </View>
                </ImageBackground>
            </View>
        );
    }
};



function authenticate() {

    if (Platform.OS === 'ios') {
        return TouchID.authenticate()
            .then(success => {
                console.log('Authentication Success')
                Actions.basemain()
            })
            .catch(error => {
                console.log(error)
            });
    } else if (Platform.OS === 'android') {
        return TouchID.authenticate()
            .then(success => {
                console.log('Authentication Success')
                Actions.basemain()
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default CreatePinCode;