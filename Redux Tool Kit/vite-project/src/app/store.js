import { configureStore } from '@reduxjs/toolkit';
import mobileReducer from '../features/mobile/mobileSlice';

// redux store configuration
export const store = configureStore({
  reducer: {
    mobiles: mobileReducer,
    // users: userReducer,
  },
});
