import React, { Component } from 'react';
import {
    AlertIOS,
    AlertAndroid,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    NativeModules,
    Platform
} from 'react-native';

import TouchID from 'react-native-touch-id'
//config is optional to be passed in on Android
const optionalConfigObject = {
    title: "Authentication Required", // Android
    color: "#e00606", // Android,
    fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#21ce99'
    },
    btn: {
        borderRadius: 3,
        width:'80%',
        marginTop: 400,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#ffffff'
    }
});

class FingerPrint extends React.Component {

    constructor() {
        super()
        this.state = {
            biometryType: null
        };
    }

    componentDidMount() {

        TouchID.isSupported()
            .then(biometryType => {
                if (biometryType === 'TouchID') {
                    this.setState({ biometryType:'Touch ID' });
                // Touch ID is supported on iOS
                } else if (biometryType === 'FaceID') {
                    this.setState({ biometryType:'Face ID' });
                // Face ID is supported on iOS
                } else if (biometryType === true) {
                    this.setState({ biometryType:'Fingerprint Authentication' });
                // Touch ID is supported on Android
                }
            })
            .catch(error => {
                // User's device does not support Touch ID (or Face ID)
                // This case is also triggered if users have not enabled Touch ID on their device
            });
    }

    clickHandler() {
        if (Platform.OS === 'ios') {
            TouchID.isSupported()
                .then(authenticate)
                .catch(error => {
                    AlertIOS.alert('TouchID not supported');
                });
        } else if (Platform.OS === 'android') {
            TouchID.isSupported()
                .then(authenticate)
                .catch(error => {
                    AlertAndroid.alert('Fingerprint Authentication not supported');
                });
        }
    }

    pressHandler() {
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
            .then(success => {
                AlertIOS.alert('Authenticated Successfully');
            })
            .catch(error => {
                AlertIOS.alert('Authentication Failed');
            });
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TouchableHighlight
                    style={styles.btn}
                    onPress={this.clickHandler}
                    underlayColor="rgba(255,255,255,0.2)"
                    activeOpacity={1}
                >
                    <Text style={{
                        color: '#21ce99',
                        fontWeight: '600'
                    }}>
                        {`Unlock with ${this.state.biometryType}`}
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
};


function authenticate() {

    if (Platform.OS === 'ios') {
        return TouchID.authenticate()
            .then(success => {
                AlertIOS.alert('Authenticated Successfully');
            })
            .catch(error => {
                console.log(error)
                AlertIOS.alert(error.message);
            });
    } else if (Platform.OS === 'android') {
        return TouchID.authenticate()
            .then(success => {
                AlertAndroid.alert('Authenticated Successfully');
            })
            .catch(error => {
                console.log(error)
                AlertAndroid.alert(error.message);
                })
    }
}

export default FingerPrint;