import { createSlice } from "@reduxjs/toolkit";
import { API_URL, AVATAR_PATH } from "../Constants";

const loginDataStorage: string | null =
  typeof window !== "undefined"
    ? window.localStorage.getItem("loginData")
    : null;

const loginDataValue =
  loginDataStorage !== null ? JSON.parse(loginDataStorage) : null;

const initialState = {
  loginData: loginDataValue,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginData(state, data) {
      let stateData = data.payload.data.loginUser;
      if (!stateData) {
        stateData = data.payload.data.signUpUser;
      }

      state.loginData = stateData;
      localStorage.setItem("loginData", JSON.stringify(stateData));
    },
    logout(state) {
      state.loginData = null;
      localStorage.removeItem("loginData");
    },
    updateClientAvatar(state, data) {
      const newAvatarUrl = data.payload.data.updateAvatar.avatarUrl;
      state.loginData.user.avatarUrl = newAvatarUrl;

      //@ts-ignore
      const loginData = JSON.parse(localStorage.getItem("loginData"));
      loginData.user.avatarUrl = newAvatarUrl;
      localStorage.setItem("loginData", JSON.stringify(loginData));
    },
  },
});

export default authSlice.reducer;

export const { setLoginData, logout, updateClientAvatar } = authSlice.actions;
