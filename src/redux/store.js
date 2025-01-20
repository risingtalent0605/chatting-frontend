import { configureStore, createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import { combineReducers } from "redux";
import { jwtDecode } from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      name: null,
      email: null,
      token: null
    },
  },
  reducers: {
    login(state, action) {
      const decoded = jwtDecode(action.payload.token);
      console.log(action.payload.token);
      state.user.name = decoded.name;
      state.user.email = decoded.email;
      state.user.token = action.payload.token;
    },
    logout(state) {
      state.user.name = null;
      state.user.email = null;
      state.user.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
















// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });