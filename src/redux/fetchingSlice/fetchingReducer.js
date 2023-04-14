import { LOCAL_DATA } from '../../utils/localData';
import axios from 'axios';
const URL = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";


const initialState = {isLoading: true};

export default function fetchingReducer(state = initialState, action) {
    switch (action.type) {
        case 'shipmentsLoaded': {
            return action.payload.isLoading
        }
        case 'shipmentsLoadingFailed': {
            return action.payload.isLoading
        }
        case 'shipmentsLoadingFinished': {
            return action.payload.isLoading
        }
        default:
            return state
    }
}

export async function fetchData(dispatch) {
    try {
        const response = await axios.get(URL);
        dispatch({ type: 'shipmentsLoaded', payload: {
                data: response.data,
                isLoading: true,
            }})
    } catch(error){
        console.log(error);
        dispatch({ type: 'shipmentsLoadingFailed', payload: {
                data: LOCAL_DATA,
                isLoading: false
            }})
    } finally {
        dispatch({ type: 'shipmentsLoadingFinished', payload: {
                isLoading: false
            }})
    }
}