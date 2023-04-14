import { combineReducers } from 'redux';
import shipmentsReducer from './shipmentsSlice/shipmentsReducer';
import fetchingReducer from "./fetchingSlice/fetchingReducer";



const rootReducer = combineReducers({
    shipments: shipmentsReducer,
    fetching: fetchingReducer
})

export default rootReducer