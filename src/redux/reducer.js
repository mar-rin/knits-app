import { combineReducers } from 'redux';
import shipmentsReducer from './shipmentsSlice/shipmentsReducer';


const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    shipments: shipmentsReducer
})

export default rootReducer