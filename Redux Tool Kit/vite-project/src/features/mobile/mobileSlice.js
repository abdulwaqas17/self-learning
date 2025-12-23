// import { createSlice } from '@reduxjs/toolkit';

// const mobileSlice = createSlice({
//   name: "mobiles",
//   initialState: {
//     list: [],
//   },
//   reducers: {
//     addMobile: (state, action) => {
//       state.list.push(action.payload);
//     },
//     removeMobile: (state, action) => {
//       state.list = state.list.filter(m => m.id !== action.payload);
//     }
//   }
// });

// export const { addMobile, removeMobile } = mobileSlice.actions;
// export default mobileSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const mobileSlice = createSlice({
  name: "mobileSliceName",
  initialState: {
    list: [],
    status: "idle",
    lastUpdated: null,
    totalAdded: 0,
    totalDeleted: 0,
  },
  reducers: {
    addMobile: (state, action) => {
      state.list.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
      state.lastUpdated = new Date().toISOString();
      state.totalAdded += 1;
    },
    removeMobile: (s, action) => {
      s.list = s.list.filter((m) => m.id !== action.payload);
      s.lastUpdated = new Date().toISOString();
      s.totalDeleted += 1;
    },
    editMobile: (state, action) => {
      console.log('=================edit action===================');
      console.log(action);
      console.log(action.payload);
      console.log('=================edit action===================');
      state.list = state.list.map((m) =>
        m.id === action.payload.id ? action.payload.data : m
      );
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { addMobile, removeMobile, editMobile } = mobileSlice.actions;
export default mobileSlice.reducer;
