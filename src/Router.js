import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Stock from './views/Stock/Stock'
import StockOrder from './views/Stock/StockOrder'
import StockReview from './views/Stock/StockReview'
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
                <Scene key="stock"  hideNavBar={true} renderLeftButton={() => <View/>} component={Stock}/>
                <Scene key="unlock" component={Unlock} navTransparent={true} navigationBarStyle={{ backgroundColor: '#21ce99', elevation:0 }} titleStyle={{color:'white'}} initial/>
                <Scene key="stockorder" component={StockOrder} title="StockOrder"/>
                <Scene key="stockreview" component={StockReview} title="StockReview"/>
                <Scene key="stockinvoice" component={StockInvoice} title="StockInvoice"/>
                <Scene key="chat" component={Chat} title="Chat" />
            </Scene>
        </Router>
    )
}

export default RouterComponent;