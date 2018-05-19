import { combineReducers } from 'redux';
import toastReducer from 'client/app/redux/reducers/toast';

const reducer = combineReducers({
  toast: toastReducer,
});

export default reducer;
