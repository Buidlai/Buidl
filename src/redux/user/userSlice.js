import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const GET_USER_STATUS = "http://127.0.0.1:8000/user-status/";
const SIGN_UP_USER = "http://127.0.0.1:8000/signup/";

const initialState = {
  loading: false,
  currentUser: null,
  userStatus: [],
  error: null
}


export const getUserStatus = createAsyncThunk(
  'userStatus/getUserStatus',
  async (thunkAPI) => {
    const response = await axios.get(GET_USER_STATUS);
    return response.data;
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (formData, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await axios.post(SIGN_UP_USER, formData, {
        headers,
      });
      return response.data; // Assuming your API returns data upon successful user creation
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle error and provide rejected value
    }
  }
);


// export const getUserStatus = createAsyncThunk('status/getUserStatus', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get(GET_USER_STATUS);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue('cannot get status!');
//   }
// });

const userSlice = createSlice({
  name: 'userStatus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(createUser.fulfilled, (state, action) => ({
        ...state,
        currentUser: action.payload,
        error: null,
      }))
      .addCase(createUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.error.message,
      }))
      .addCase(getUserStatus.fulfilled, (state, action) => ({
        ...state,
        userStatus: action.payload,
      }))
  }
});

export default userSlice.reducer;