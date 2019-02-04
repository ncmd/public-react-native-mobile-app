import { combineReducers } from 'redux';
import stylesReducer from './stylesReducer';
import bottomNavigationReducer from './bottomNavigationReducer';
import stockslistReducer from './stockslistReducer';

const rootReducer = combineReducers({
    style:stylesReducer,
    bottomnavigation:bottomNavigationReducer,
    stockslist:stockslistReducer,
  })
  
  export default rootReducer;