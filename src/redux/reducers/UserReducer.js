import { createSlice } from '@reduxjs/toolkit';

const UserReducer = createSlice({
  name: 'UserReducer', 
  initialState: {
    userData: {},
    temp_data: {},
    notification_setting: {
      general_notification: true,
      app_updates: true,
      new_courses: true,
      new_tips: true,
      special_offer: true,
    },
    token:"",
    currancyObj:{},
    priceRate:{},
    skipLogin:false,
    network: true,
    login: false,
    first: false,
    selectedLocation:"",
    cartSnack:{}

  },
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      return { ...state, userData: user, login: true, skipLogin:false };
    },
    setSckipLogin(state, action) {
      const user = action.payload;
      return { ...state, skipLogin:false };
    },
    setTempUser(state, action) {
      const user = action.payload;
      return { ...state, temp_data: user };
    },

    removeUser(state, action) {
      return { ...state, userData: {}, login: false };
    },
    setToken(state, action) {
      return { ...state,  token: action.payload };
    },
    setSelectedLocation(state, action) {
      return { ...state,  selectedLocation: action.payload };
    },
    setCurrancyObj(state, action) {
      return { ...state,  currancyObj: action.payload };
    },
    setPriceRate(state, action) {
      return { ...state,  priceRate: action.payload };
    },
    modifyNetWork(state, action) {
      return { ...state, network: action.payload };
    },
    modifyIsFirst(state, action) {
      return { ...state, first: action.payload };
    },
    modifyIsLogin(state, action) {
      return { ...state, login: action.payload };
    },
    setSkipLogin(state,action){
      const skip = action.payload
      return { ...state, skipLogin: skip };
    },
    setCartSnack(state,action){
      const updateSnack = action.payload
      return { ...state, cartSnack: updateSnack };
    },

    setNotificationSetting(state, action) {
      const settings = action.payload;
      return { ...state, notification_setting: settings };
    }
  },
});

export const {
  setUser,
  removeUser,
  modifyNetWork,
  modifyIsFirst,
  setTempUser,
  setNotificationSetting,
  modifyIsLogin,
  setSkipLogin,
  setToken,
  setSckipLogin,
  setCurrancyObj,
  setPriceRate,
  setSelectedLocation,
  setCartSnack

} = UserReducer.actions;
export default UserReducer.reducer;
