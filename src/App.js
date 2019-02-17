import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './redux/reducers';
import Router from './Router'
import epicMiddleware from './rxjs/epics/rootEpic';

const persistConfig = {
    key: 'root',
    storage: storage,
}
const persistedReducer = persistReducer(persistConfig, reducers)

const store = createStore(persistedReducer, (applyMiddleware(thunk,epicMiddleware)));

const persistor = persistStore(store)

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;