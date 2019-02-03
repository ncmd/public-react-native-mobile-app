import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LandingMain from './views/Landing/LandingMain';
import LoginMain from './views/Login/LoginMain';
import SignupMain from './views/Signup/SignupMain';
import SignupStep1 from './views/Signup/SignupStep1';
import SignupStep2 from './views/Signup/SignupStep2';
import SignupStep3 from './views/Signup/SignupStep3';
import StockView from './views/Stock/StockView';
import StockOrder from './views/Stock/StockOrder';
import StockReviewOrder from './views/Stock/StockReviewOrder';
import StockInvoice from './views/Stock/StockInvoice';
import BaseMain from './views/Base/BaseMain';
import StockList from './views/Stock/StockList';
import Chat from './views/Chat/Chat';
import Unlock from './views/Authentication/Unlock';
import {
    View
} from 'react-native';
const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root" navTransparent={true}>
                <Scene key="basemain"  hideNavBar={true} renderLeftButton={() => <View/>} component={BaseMain} initial/>
                <Scene key="landingmain"  hideNavBar={true} renderLeftButton={() => <View/>} component={LandingMain}/>
                <Scene key="signupmain" init={true} headerTintColor="#21ce99" component={SignupMain} navTransparent={true} />
                <Scene key="loginmain" init={true} headerTintColor="#21ce99" component={LoginMain} navTransparent={true} />
                <Scene key="signupstep1" init={false} headerTintColor="#21ce99" component={SignupStep1} navTransparent={true} title="Step 1 of 3" titleStyle={{fontSize:14}}/>
                <Scene key="signupstep2" init={false} headerTintColor="#21ce99" component={SignupStep2} navTransparent={true} title="Step 2 of 3" titleStyle={{fontSize:14}}/>
                <Scene key="signupstep3" init={false} headerTintColor="#21ce99" component={SignupStep3} navTransparent={true} title="Step 3 of 3" titleStyle={{fontSize:14}}/>
                <Scene key="unlock" component={Unlock} navTransparent={true} navigationBarStyle={{ backgroundColor: '#21ce99', elevation:0 }} titleStyle={{color:'white'}}/>
                <Scene key="stockview"  hideNavBar={true} renderLeftButton={() => <View/>} component={StockView}/>
                <Scene key="stocklist"  hideNavBar={true} renderLeftButton={() => <View/>} component={StockList}/>
                <Scene key="stockorder" component={StockOrder} title="StockOrder"/>
                <Scene key="stockrevieworder" component={StockReviewOrder} title="StockReviewOrder"/>
                <Scene key="stockinvoice" component={StockInvoice} title="StockInvoice"/>
                <Scene key="chat" component={Chat} title="Chat" />
            </Scene>
        </Router>
    )
}

export default RouterComponent;