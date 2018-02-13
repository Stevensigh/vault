import { combineReducers } from 'redux';
import sampleReducer from 'client/app/redux/reducers/sample';

const reducer = combineReducers({
  sample: sampleReducer,
});

export default reducer;
