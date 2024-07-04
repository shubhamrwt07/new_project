import { combineReducers } from 'redux';
import { countReducer, productReducer,cartLikeReducer,cartAddReducer } from './redux/Product/reducer';
import authReducer from './redux/Login/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart:cartLikeReducer,
  item:cartAddReducer,

  count:countReducer
});

export default rootReducer;
