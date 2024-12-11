// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Car {
//     cityFrom: any;
//     cityTo: any;
//     selectedCar: any;
//     price: any;
//     distance: any;
// }


// interface CarState {
//     selectedCars: Car[];
//     userInfo: Record<string, any>;
//     carInfo: Record<string, any>;
// }

// const initialState: CarState = {
//     selectedCars: [],
//     userInfo: [],
//     carInfo: [],
// };

// const CarSlice = createSlice({
//     name: 'car',
//     initialState,
//     reducers: {
//         addCar: (state, action: PayloadAction<Car>) => {
//             state.selectedCars.push(action.payload);
//         },
//         setUserInfo(state, action: PayloadAction<Record<string, any>>) {
//             state.userInfo = action.payload;
//         },
//         setCarInfo(state, action: PayloadAction<Record<string, any>>) {
//             state.carInfo = action.payload;
//         },
//     },
// });

// export const { addCar, setUserInfo, setCarInfo } = CarSlice.actions;
// export default CarSlice.reducer;
