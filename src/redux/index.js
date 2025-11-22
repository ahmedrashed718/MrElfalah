import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import thunk from 'redux-thunk';
const store = configureStore({
  reducer,
  // middleware: [thunk],
});
export default store;
