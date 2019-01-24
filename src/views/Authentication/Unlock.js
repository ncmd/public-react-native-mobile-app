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


class Unlock extends React.Component {

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
                    this.setState({ biometryType: 'Touch ID' });
                    // Touch ID is supported on iOS
                } else if (biometryType === 'FaceID') {
                    this.setState({ biometryType: 'Face ID' });
                    // Face ID is supported on iOS
                } else if (biometryType === true) {
                    this.setState({ biometryType: 'Fingerprint Authentication' });
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
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('./pattern.png')}
                    style={{ width: 1000, height: 1000, transform: [{ rotate: '-35deg' }] }}
                    resizeMode="repeat"
                >
                    <View style={styles.interactiveContainer}>
                    <SLIicon name="eye" style={{ fontSize: 110,color: 'white',marginTop:50 }}></SLIicon>
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
                        <Button title="Log Out" titleStyle={{ textAlign: "center", width: '80%', color: 'white', fontFamily: sanFranciscoWeights.regular.fontFamily, fontWeight: sanFranciscoWeights.regular.fontWeight }} raised={false} buttonStyle={{ marginTop: 25, elevation: 0, backgroundColor: "transparent" }} />
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
            })
            .catch(error => {
                console.log(error)
            });
    } else if (Platform.OS === 'android') {
        return TouchID.authenticate()
            .then(success => {
                console.log('Authentication Success')
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default Unlock;