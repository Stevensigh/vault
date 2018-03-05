import { combineReducers } from 'redux';
import authReducer from 'client/app/redux/reducers/auth';

const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;
