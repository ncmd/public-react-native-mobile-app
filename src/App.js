import React from 'react';
import Header from './components/Header/Header';
import AlbumList from './components/Album/AlbumList';
import { View } from 'react-native'
// Redux Setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './redux/reducers';
import ChatComponent from './views/Chat/Chat'
import StockComponent from './views/Stock/Stock'
import StockOrderComponent from './views/Stock/StockOrder'
import Router from './Router'

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, (applyMiddleware(thunk)));

const persistor = persistStore(store)

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                <Router/>
                    {/* <View>
                        <Header headerText={'Chat'} />
                        <AlbumList />
                    </View> */}
                </PersistGate>
            </Provider>
        );
    }
}

export default App;