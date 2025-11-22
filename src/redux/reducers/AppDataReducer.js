import { createSlice } from '@reduxjs/toolkit';

const AppDataReducer = createSlice({
  name: 'AppDataReducer',
  initialState: {
    homeData: {},
    homeLoading: true,
    notifications: [],
    notificationsLoading: true,
    reports_data: [],
    currentHomeTabView: {},
    isOpenPayment:false

  },
  reducers: {
    setHome(state, action) {
      const data = action.payload;
      return { ...state, homeData: data, homeLoading: false };
    },
    setReports(state, action) {
      const data = action.payload;
      return { ...state, reports_data: data };
    },
    setHomeLoading(state, action) {
      const data = action.payload;
      return { ...state, homeLoading: data };
    },
    setNotifications(state, action) {
      const data = action.payload;
      return { ...state, notifications: data, notificationsLoading: false };
    },
    setIsOpenPayment(state, action) {
      const data = action.payload;
      return { ...state, isOpenPayment: data,  };
    },
    setNotificationsLoading(state, action) {
      const data = action.payload;
      return { ...state, notificationsLoading: data };
    },
    setCurrentHomeTabView(state, action) {
      const data = action.payload;
      return { ...state, currentHomeTabView: data };
    }
  },
});

export const {
  setHome,
  setHomeLoading,
  setNotifications,
  setNotificationsLoading,
  setReports,
  setCurrentHomeTabView,
  setIsOpenPayment
} = AppDataReducer.actions;
export default AppDataReducer.reducer;
