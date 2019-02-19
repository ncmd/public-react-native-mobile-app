import { combineReducers } from 'redux';
import stylesReducer from './stylesReducer';
import bottomNavigationReducer from './bottomNavigationReducer';
import stocksReducer from './stocksReducer';
import stockReducer from './stockReducer';
import stockOrderReducer from './stockOrderReducer';
import stockWatchlistReducer from './stockWatchlistReducer';
import stockPositionsReducer from './stockPositionsReducer';
import signupReducer from './signupReducer';
import accountReducer from './accountReducer';
import pinReducer from './pinReducer';
import routesReducer from './routesReducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const rootPersistConfig = {
  key: 'root',
  storage: storage,
};


const rootReducer = combineReducers({
  routes: routesReducer,
  pin: pinReducer,
  account: accountReducer,
  style: stylesReducer,
  bottomnavigation: bottomNavigationReducer,
  stocks: stocksReducer,
  stock: stockReducer,
  stockOrder: stockOrderReducer,
  stockWatchlist: stockWatchlistReducer,
  stockPositions: stockPositionsReducer,
  signup: signupReducer,
})

export default persistReducer(rootPersistConfig, rootReducer)
