import { createSlice } from '@reduxjs/toolkit';

interface DistanceState {
    carsInfo : [];
}

const initialState: DistanceState = {
    carsInfo : []
};

const distanceSlice = createSlice({
    name: 'distance',
    initialState,
    reducers: {
        
    },
});

export const {  } = distanceSlice.actions;

export default distanceSlice.reducer;
