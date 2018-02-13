import { INCREMENT } from 'client/app/redux/actions/sample';
import createReducer from 'client/app/redux/reducers/create-reducer';

const initialState = {
  num: 1,
};

const incrementReducer = (state) => ({
  ...state,
  num: state.num + 1,
});

const reducerMapping = {
  [INCREMENT]: incrementReducer,
};

export default createReducer(reducerMapping, initialState);
