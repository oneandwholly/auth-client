import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import picturesReducer from './pictures_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    pictures: picturesReducer
});

export default rootReducer;
