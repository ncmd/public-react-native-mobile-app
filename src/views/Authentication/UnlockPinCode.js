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
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
    accountLogin,
    accountLogout,
} from '../../redux/actions/actions_account';
import { setBottomNavigation,deleteUserPinCode } from '../../redux/actions/actions_bottom_navigation';

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


class UnlockPinCode extends React.Component {

    constructor() {
        super()
        this.state = {
            pincode: "",
            hasCode: false
        };
    }

    storePincode(pincode) {
        this.setState({ pincode: pincode })
    }

    componentDidMount() {
        this.props.setBottomNavigation("portfolio")
        console.log("UnlockPinCode: this.props.account", this.props.account)
        this.hasSet()
        
    }

    hasSet = async () => {
        const res = await hasUserSetPinCode()
        console.log("Has Pincode:", res)
        if (res == true) {
            this.setState({
                hasCode: true
            })
        }
    }

    logout = async () =>  {
        firebase.auth().signOut().then(function () {
            Actions.landingmain()
            // this.props.accountLogout()
        }).catch(function (error) {
            // An error happened.
        });

         // Sign-out successful.
         await deleteUserPinCode()
        
    }

    createPinCode() {
        return (
            <PINCode status={'choose'}
                finishProcess={() => this.hasSet()}
                stylePinCodeColorTitle="white"
                subtitleChoose={' '}
                stylePinCodeDeleteButtonColorShowUnderlay="white"
                stylePinCodeDeleteButtonColorHideUnderlay="white"
                colorPassword={"white"}
                stylePinCodeButtonNumberPressed={"white"}
                stylePinCodeButtonNumber={"#21ce99"}
                titleChoose={"Create PIN code"}
                titleConfirm={"Confirm PIN code"}
                stylePinCodeButtonCircle={{ alignItems: 'center', justifyContent: 'center', width: 15 * 4, height: 15 * 4, borderColor: '#21ce99', borderWidth: 2, backgroundColor: 'white', borderRadius: 10 * 2 }}
                stylePinCodeTextTitle={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }} />
        )
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
                        <Text>{this.state.hasCode}</Text>
                        {this.state.hasCode
                            ?
                            <PINCode status={'enter'}
                                storePin={(code) => this.storePincode(code)}
                                touchIDDisabled={false}
                                finishProcess={() => Actions.basemain()}
                                stylePinCodeColorTitle="white"
                                subtitleChoose={' '}
                                stylePinCodeDeleteButtonColorShowUnderlay="white"
                                stylePinCodeDeleteButtonColorHideUnderlay="white"
                                colorPassword={"white"}
                                stylePinCodeButtonNumberPressed={"white"}
                                stylePinCodeButtonNumber={"#21ce99"}
                                stylePinCodeButtonCircle={{ alignItems: 'center', justifyContent: 'center', width: 15 * 4, height: 15 * 4, borderColor: '#21ce99', borderWidth: 2, backgroundColor: 'white', borderRadius: 10 * 2 }}
                                stylePinCodeTextTitle={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }} />
                            :
                            this.createPinCode()
                        }

                    </View>
                </ImageBackground>
            </View>
        );
    }
};

function mapStateToProps({ style, account }) {
    return {
        style,
        account
    };
}

export default connect(mapStateToProps, {
    accountLogin,
    accountLogout,
    setBottomNavigation,
})(UnlockPinCode);