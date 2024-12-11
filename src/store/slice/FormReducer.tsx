import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormState {
    city1: string;
    city2: string;
    pickUpDate: string;
    pickUpTime: string;
    returnDate: string;
    city: string;
    pickupAddress: string;
    dropAirport: string;
}

interface FormArrayState {
    forms: FormState[]; 
}

const initialState: FormArrayState = {
    forms: [],
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addFormData(state, action: PayloadAction<FormState>) {
            state.forms.push(action.payload);
        },
        updateFormData(state, action: PayloadAction<{ index: number; data: Partial<FormState> }>) {
            const { index, data } = action.payload;
            if (state.forms[index]) {
                state.forms[index] = { ...state.forms[index], ...data };
            }
        },
        removeFormData(state, action: PayloadAction<number>) {
            state.forms.splice(action.payload, 1); 
        },
        resetFormData() {
            return initialState;
        },
    },
});

export const { addFormData, updateFormData, removeFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;
