import React, { Component } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Image,
    NativeModules,
    Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import { systemWeights, robotoWeights, sanFranciscoWeights } from 'react-native-typography'
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
        borderRadius: 5,
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
                    Alert.alert(
                        'TouchID not supported',
                        'My Alert Msg',
                        [
                          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                });
        } else if (Platform.OS === 'android') {
            TouchID.isSupported()
                .then(authenticate)
                .catch(error => {
                    Alert.alert(
                        'Fingerprint Authentication not supported',
                        'My Alert Msg',
                        [
                          {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      )
                });
        }
    }

    pressHandler() {
        TouchID.authenticate('to demo this react-native component', optionalConfigObject)
            .then(success => {
                Alert.alert(
                    'Authenticated Successfully',
                    'My Alert Msg',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            })
            .catch(error => {
                Alert.alert(
                    'Authentication Failed',
                    'My Alert Msg',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            });
    }

    render() {
        return (
            <View style={styles.container}>
                
                <TouchableHighlight
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
                        {`Unlock with ${this.state.biometryType}`}
                    </Text>
                </TouchableHighlight>
                <Button title="Log Out" titleStyle={{ textAlign:"center", width: '80%',color:'white',fontFamily: sanFranciscoWeights.regular.fontFamily, fontWeight: sanFranciscoWeights.regular.fontWeight }} raised={false} buttonStyle={{ marginTop:25, elevation: 0, backgroundColor:"transparent"}}/>
            </View>
        );
    }
};


function authenticate() {

    if (Platform.OS === 'ios') {
        return TouchID.authenticate()
            .then(success => {
                Alert.alert(
                    'Authenticated Successfully',
                    'My Alert Msg',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            })
            .catch(error => {
                console.log(error)
                Alert.alert(
                    'Authentication Failed',
                    error.message,
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            });
    } else if (Platform.OS === 'android') {
        return TouchID.authenticate()
            .then(success => {
                Alert.alert(
                    'Authenticated Successfully',
                    'My Alert Msg',
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            })
            .catch(error => {
                console.log(error)
                Alert.alert(
                    'Authentication Failed',
                    error.message,
                    [
                      {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
                })
    }
}

export default FingerPrint;