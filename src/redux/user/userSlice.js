import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GET_USER_STATUS = "http://127.0.0.1:8000/user-status"

const initailState = {
  loading: false,
  currentUser: null,
  userStatus: null,
  error: null
}




export const getUserStatus =  createAsyncThunk('status/getUserStatus', async (thunkAPI) => {
  try {
    const response = await axios(GET_USER_STATUS);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('cannot get status!');
  }
});

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserStatus.fulfilled, (state, action) => ({
        ...state,
        userStatus: action.payload
      }))
  }
});

export default UserSlice.reducer;