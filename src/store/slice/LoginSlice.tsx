import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string | null;
    email: string | null;
    isLoggedIn: boolean;
}

const initialState: UserState = {
    id: null,
    email: null,
    isLoggedIn: false,
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ id: string; email: string }>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.isLoggedIn = true;

            // Save user to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.id = null;
            state.email = null;
            state.isLoggedIn = false;

            // Remove user from localStorage
            localStorage.removeItem("user");
        },
        restoreUser: (state, action: PayloadAction<{ id: string; email: string } | null>) => {
            if (action.payload) {
                state.id = action.payload.id;
                state.email = action.payload.email;
                state.isLoggedIn = true;
            }
        },
    },
});

export const { login, logout, restoreUser } = loginSlice.actions;

export default loginSlice.reducer;
