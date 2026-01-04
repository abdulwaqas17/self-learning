import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./services/userApi";

console.log('================usersApi====================');

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
});
