import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import photosReducer from './photos_reducer';
import commentsReducer from './comments_reducer';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    photos: photosReducer,
    comments: commentsReducer
});

export default rootReducer;
