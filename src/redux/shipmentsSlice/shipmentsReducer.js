import { LOCAL_DATA } from '../../utils/localData';
import axios from 'axios';
const URL = "https://my.api.mockaroo.com/shipments.json?key=5e0b62d0";

const initialState = [];

export default function shipmentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'shipmentsLoaded': {
            return action.payload
        }
        case 'shipmentsLoadingFailed': {
            return action.payload
        }
        case 'shipmentDeleted': {
            return state.filter((shipment) => shipment.trackingNo !== action.payload)
        }
        case 'shipmentEdited': {
            return state.map((shipment) => {
                if (shipment.trackingNo !== action.payload.id) {
                    return shipment
                }
                return action.payload.editedData
            })
        }
        default:
            return state
    }
}

export async function fetchShipments(dispatch) {
    try {
        const response = await axios.get(URL);
        dispatch({ type: 'shipmentsLoaded', payload: response.data })
    } catch(error){
        console.log(error);
        dispatch({ type: 'shipmentsLoadingFailed', payload: LOCAL_DATA })
    }
}
