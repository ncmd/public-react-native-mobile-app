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
import { sanFranciscoWeights } from 'react-native-typography'
import { connect } from 'react-redux';
import {
    androidStyleLoad,
    iosStyleLoad,
} from '../../redux/actions/actions_styles';
import HeaderBase from '../../components/Header/HeaderBase';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode'
import { systemWeights} from 'react-native-typography'
import { Actions } from 'react-native-router-flux';
import * as firestore_users from '../../firestore/firestore_users';
import {
    accountLogout
} from '../../redux/actions/actions_account';

class SignupStep4 extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0,
            pincode:"",
        }
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.props.iosStyleLoad()
        }
        if (Platform.OS === 'android') {
            this.props.androidStyleLoad()
        }
    }

    storePincode(pincode){
        this.setState({pincode:pincode})
    }

    hasSet = async() => {
        const { signup } = this.props

        const res = await hasUserSetPinCode()
        console.log(res)
        if (res == true){
            // Create User document in Firestore Database
            firestore_users.createNewUser(signup[0].email, signup[0].phone)
            // Push user to Base App View
            this.props.accountLogout()
            Actions.landingmain()
        }
      }

    render() {
        return (
            <View style={{ backgroundColor: this.props.style[0].ViewBackgroundColorPrimary, height: '100%' }}>
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
                    stylePinCodeButtonCircle={{ alignItems: 'center', justifyContent: 'center', width: 15 * 4, height: 15 * 4, borderColor: '#21ce99', borderWidth: 2, backgroundColor: '#0e0d0d', borderRadius: 10 * 2 }}
                    stylePinCodeTextTitle={{ fontSize: 20, fontWeight: systemWeights.regular.fontWeight, textAlign: 'center' }} />
            </View>
        );
    }
}

function mapStateToProps({ style,signup,account }) {
    return {
        style,
        signup,
        account,
    };
}

export default connect(mapStateToProps, {
    androidStyleLoad,
    iosStyleLoad,
    accountLogout,
})(SignupStep4);