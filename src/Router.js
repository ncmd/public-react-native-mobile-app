import React, { Component } from 'react';
import { Scene, Router, Modal } from 'react-native-router-flux';
import LandingMain from './views/Landing/LandingMain';
import LoginMain from './views/Login/LoginMain';
import SignupMain from './views/Signup/SignupMain';
import SignupStep1 from './views/Signup/SignupStep1';
import SignupStep2 from './views/Signup/SignupStep2';
import SignupStep3 from './views/Signup/SignupStep3';
import SignupStep4 from './views/Signup/SignupStep4';
import StockView from './views/Stock/StockView';
import StockOrder from './views/Stock/StockOrder';
import StockOrderInvoice from './views/Stock/StockOrderInvoice';
import StockInvoice from './views/Stock/StockInvoice';
import BaseMain from './views/Base/BaseMain';
import StockList from './views/Stock/StockList';
import Chat from './views/Chat/Chat';
// import Unlock from './views/Authentication/Unlock';
import UnlockPinCode from './views/Authentication/UnlockPinCode';
import {
    View
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
    accountLogin,
    accountLogout,
    setAccountInformation,
} from './redux/actions/actions_account';


class RouterComponent extends React.Component {

    constructor() {
        super()
        this.unsubscriber = null;
        this.state = {
            selectedIndex: 0,
            user: null,
            isUserLogin: false
        }
    }

    componentDidMount() {
        // console.log("Router:",this.props.account.loggedIn)
        // this.props.accountLogin()
        // this.props.accountLogout()
        this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
            // console.log("componentDidMount user:", user)
            if (user !== null) {
                console.log("Router this.props.account this.props.account.loggedIn:", this.props.account.loggedIn)
                // // this.setState({ isUserLogin:true });
                // this.props.accountLogin()
                
            } else {
                // this.setState({ isUserLogin:false });
                this.props.accountLogout()
                // console.log("Router this.props.account this.props.account[0].loggedIn:",  this.props.account.loggedIn)
            }
        });
    }


    componentWillUnmount() {
        // console.log("UNMOUNT:", this.unsubscriber, this.props.account)
        if (this.unsubscriber) {
            this.unsubscriber();
            // this.props.accountLogout
        }
    }

    render() {
        const { loading } = this.props;
        return (
            !loading && <Router >
                <Scene key="root" navTransparent={true}>
                    <Scene gesturesEnabled={false} key="unlockpincode" component={UnlockPinCode} initial={this.props.account.loggedIn} navTransparent={true} navigationBarStyle={{ backgroundColor: '#21ce99', elevation: 0 }} titleStyle={{ color: 'white' }} />
                    <Scene gesturesEnabled={false} key="basemain" hideNavBar={true} renderLeftButton={() => <View />} component={BaseMain} />
                    <Scene gesturesEnabled={false} key="landingmain" hideNavBar={true} renderLeftButton={() => <View />} component={LandingMain} initial={!this.props.account.loggedIn} />
                    <Scene gesturesEnabled={false} key="signupmain" init={true} headerTintColor="#21ce99" component={SignupMain} navTransparent={true} />
                    <Scene gesturesEnabled={false} key="loginmain" init={true} headerTintColor="#21ce99" component={LoginMain} navTransparent={true} />
                    <Scene gesturesEnabled={false} key="signupstep1" init={false} headerTintColor="#21ce99" component={SignupStep1} navTransparent={true} title="Step 1 of 4" titleStyle={{ fontSize: 14 }} />
                    <Scene gesturesEnabled={false} key="signupstep2" init={false} headerTintColor="#21ce99" component={SignupStep2} navTransparent={true} title="Step 2 of 4" titleStyle={{ fontSize: 14 }} />
                    <Scene gesturesEnabled={false} key="signupstep3" init={false} headerTintColor="#21ce99" component={SignupStep3} navTransparent={true} title="Step 3 of 4" titleStyle={{ fontSize: 14 }} />
                    <Scene gesturesEnabled={false} key="signupstep4" init={false} headerTintColor="#21ce99" component={SignupStep4} navTransparent={true} title="Step 4 of 4" titleStyle={{ fontSize: 14 }} />
                    <Scene gesturesEnabled={false} key="stockview" component={StockView} />
                    <Scene gesturesEnabled={false} key="stocklist" hideNavBar={true} renderLeftButton={() => <View />} component={StockList} />
                    <Scene gesturesEnabled={false} key="stockorder" component={StockOrder} />
                    <Scene gesturesEnabled={false} key="stockorderinvoice" component={StockOrderInvoice} />
                    <Scene gesturesEnabled={false} key="stockinvoice" component={StockInvoice} title="StockInvoice" />
                    <Scene gesturesEnabled={false} key="chat" component={Chat} title="Chat" />
                </Scene>
            </Router>
        )
    }
}


function mapStateToProps({ account }) {
    return {
        account
    };
}

export default connect(mapStateToProps, {
    accountLogin,
    accountLogout,
    setAccountInformation,
})(RouterComponent);