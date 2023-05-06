import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  loadUserRequest: (state) => {
    state.isLoading = false;
  },
  loadUserSuccess: (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.user = action.payload;
  },
  loadUserFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
