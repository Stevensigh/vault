import { SET_DECRYPTION_PASSWORD } from 'client/app/redux/actions/auth';
import createReducer from 'client/app/redux/reducers/create-reducer';

const initialState = {
  decryptionPassword: null,
};

const setDecryptionPasswordReducer = (state, action) => ({
  ...state,
  decryptionPassword: action.payload.password,
});

const reducerMapping = {
  [SET_DECRYPTION_PASSWORD]: setDecryptionPasswordReducer,
};

export default createReducer(reducerMapping, initialState);
