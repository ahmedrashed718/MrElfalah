import {combineReducers} from '@reduxjs/toolkit';
import UserReducer from './UserReducer';
import AppDataReducer from './AppDataReducer';

export default combineReducers({
  UserReducer,
  AppDataReducer,

});
