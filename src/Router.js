import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Stock from './views/Stock/Stock'
import StockOrder from './views/Stock/StockOrder'
import StockReview from './views/Stock/StockReview'
import StockInvoice from './views/Stock/StockInvoice'
import Chat from './views/Chat/Chat'

const RouterComponent = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="stock" component={Stock} title="Stock" initial/>
                <Scene key="stockorder" component={StockOrder} title="StockOrder"/>
                <Scene key="stockreview" component={StockReview} title="StockReview"/>
                <Scene key="stockinvoice" component={StockInvoice} title="StockInvoice"/>
                <Scene key="chat" component={Chat} title="Chat" />
            </Scene>
        </Router>
    )
}

export default RouterComponent;