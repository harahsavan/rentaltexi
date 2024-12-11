import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    isAdminLoggedIn: boolean;
}

const initialState: UserState = {
    isAdminLoggedIn: false,
};

const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState,
    reducers: {
        login: (state) => {
            state.isAdminLoggedIn = true;
          },
          logout: (state) => {
            state.isAdminLoggedIn = false;
          },
    },
});

export const {login, logout  } = AdminSlice.actions;

export default AdminSlice.reducer;