import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name : "users",
  initialState : {
    list : [],
    totatUsers : 0,
    deleteUsers : 0,
    lastUpdate: null,
  },
  reducers : {
    addUsers : (state,action) => {
      state.list.push()
    }
  }
}

)