import { combineReducers } from 'redux';
import formDataSlice from "../slice/FormReducer";
import distanceSlice from "../slice/DistanceSlice"
import RagisterData from "../slice/RagisterData"
import loginSlice from "../slice/LoginSlice"
import AdminSlice from "../slice/AdminSlice"
// import CarSlice from "../slice/CarSlice"



const rootReducer = combineReducers({
  form: formDataSlice,
  distance: distanceSlice,
  ragister: RagisterData,
  login : loginSlice,
  AdminSlice: AdminSlice,
  // car: CarSlice,
});



export default rootReducer;


