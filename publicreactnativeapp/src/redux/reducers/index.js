import { combineReducers } from 'redux';
import stylesReducer from './stylesReducer';

const rootReducer = combineReducers({
    style:stylesReducer
  })
  
  export default rootReducer;