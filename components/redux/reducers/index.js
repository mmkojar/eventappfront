import { combineReducers } from 'redux';
import authReducer from './authReducer';
import msgReducer from './msgReducer';
import delegateReducer from './delegateReducer';
import loaderReducer from './loaderReducer';
import chatReducer from './chatReducer';
import themeReducer from './themeReducer';

export default combineReducers({
    auth: authReducer,
    msg: msgReducer,
    delegate: delegateReducer,
    chats:chatReducer,
    loader: loaderReducer,
    theme:themeReducer
});