// src/redux/formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    postCode: string;
}

const initialState: FormState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    postCode: "",
};

const RagisterData = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateForm: (state, action: PayloadAction<FormState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { updateForm } = RagisterData.actions;
export default RagisterData.reducer;
