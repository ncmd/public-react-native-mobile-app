import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import LandingMain from './views/Landing/LandingMain';
import StockView from './views/Stock/StockView'
import StockOrder from './views/Stock/StockOrder'
import StockReviewOrder from './views/Stock/StockReviewOrder'
import StockInvoice from './views/Stock/StockInvoice'
import Chat from './views/Chat/Chat'
import Unlock from './views/Authentication/Unlock'
import {
    View
} from 'react-native';
const RouterComponent = () => {
    return (
        <Router >
            <Scene key="root">
                <Scene key="landingmain"  hideNavBar={true} renderLeftButton={() => <View/>} component={LandingMain} initial/>
                <Scene key="unlock" component={Unlock} navTransparent={true} navigationBarStyle={{ backgroundColor: '#21ce99', elevation:0 }} titleStyle={{color:'white'}}/>
                <Scene key="stockview"  hideNavBar={true} renderLeftButton={() => <View/>} component={StockView}/>
                <Scene key="stockorder" component={StockOrder} title="StockOrder"/>
                <Scene key="stockrevieworder" component={StockReviewOrder} title="StockReviewOrder"/>
                <Scene key="stockinvoice" component={StockInvoice} title="StockInvoice"/>
                <Scene key="chat" component={Chat} title="Chat" />
            </Scene>
        </Router>
    )
}

export default RouterComponent;