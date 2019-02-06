import { combineReducers } from 'redux';
import stylesReducer from './stylesReducer';
import bottomNavigationReducer from './bottomNavigationReducer';
import stockslistReducer from './stockslistReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
    style:stylesReducer,
    bottomnavigation:bottomNavigationReducer,
    stockslist:stockslistReducer,
    signup:signupReducer,
  })
  
  export default rootReducer;