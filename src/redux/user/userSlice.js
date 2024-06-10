import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import CryptoJS from "crypto-js";

const GET_USER_STATUS = "http://127.0.0.1:8000/user-status/";
const SIGN_UP_USER = "http://127.0.0.1:8000/signup/";
const VERIFY_USER = "http://127.0.0.1:8000/activate/";
const LOGIN_USER = "http://127.0.0.1:8000/login/";
const PERSONAL_INFO_URL = "http://127.0.0.1:8000/login/";

const SECRET_KEY = process.env.REACT_APP_CRYPTO_KEY;

const encryptToken = (token) => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

const encryptValue = (value) => {
  return CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
};

const decryptValue = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return parseInt(decryptedString, 10);
};

const decryptToken = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getTokenFromSessionStorage = () => {
  const encryptedToken = sessionStorage.getItem('token');
  if (encryptedToken) {
    return decryptToken(encryptedToken);
  }
  return null;
};

const getIdFromStorage = () => {
  const encryptValue = sessionStorage.getItem('userId');
  if (encryptValue) {
    return decryptValue(encryptValue);
  }
  return null;
}

const initialState = {
  loading: false,
  currentUser: null,
  loggedUser: null,
  userStatus: [],
  error: null,
  verified: true,
  token: getTokenFromSessionStorage(),
  userId: getIdFromStorage(),
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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);


export const verifyUser = createAsyncThunk(
  'verify/verifyUser',
  async (formData, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json'
    };
    try {
      const response = await axios.post(VERIFY_USER, formData, {
        headers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logInUser = createAsyncThunk(
  'user/logInUser',
  async(userData, thunkAPI) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.post(LOGIN_USER, userData, {
        headers,
      });

      const token = response.data.token;
      const userId = response.data.user.id.toString();
      console.log(userId)
      const encryptedToken = encryptToken(token);
      const encryptedUserId = encryptValue(userId);
      sessionStorage.setItem('userId', encryptedUserId);
      sessionStorage.setItem('token', encryptedToken);

      return {
        ...response.data,
        token: encryptedToken,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

export const getPersonalInfo = createAsyncThunk(
  'user-info/getPersonalInfo',
  async(userId, { getState, thunkAPI }) => {
    const state = getState();
    const authToken = state.user.token || initialState.token;
    const headers = {
      Authorization: `Token ${authToken}`,
    };
    try {
      const response = await axios.get(`${PERSONAL_INFO_URL}/${userId}`, { headers });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

)



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
      .addCase(verifyUser.fulfilled, (state, action) => ({
        ...state,
        verified: action.payload,
        error: null,
      }))
      .addCase(logInUser.fulfilled, (state, action) => ({
        ...state,
        loggedUser: action.payload.user,
        token: action.payload.token,
        userId: action.payload.user.id,
        error: null,
      }))
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userSlice.reducer;