import { combineReducers } from 'redux';
import stylesReducer from './stylesReducer';
import bottomNavigationReducer from './bottomNavigationReducer';

const rootReducer = combineReducers({
    style:stylesReducer,
    bottomnavigation:bottomNavigationReducer
  })
  
  export default rootReducer;