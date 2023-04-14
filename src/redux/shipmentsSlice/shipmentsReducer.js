const initialState = [];

export default function shipmentsReducer(state = initialState, action) {
    switch (action.type) {
        case 'shipmentsLoaded': {
            return action.payload.data
        }
        case 'shipmentsLoadingFailed': {
            return action.payload.data
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
        case 'customerSortedAscending': {
            return state.sort((a, b) => a.customer.toUpperCase().localeCompare(b.customer.toUpperCase()))
        }
        case 'customerSortedDescending': {
            return state.sort((b, a) => a.customer.toUpperCase().localeCompare(b.customer.toUpperCase()))
        }
        case 'dateSortedAscending': {
            const sortedItems = state.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateA - dateB;
            })
            return sortedItems
        }
        case 'dateSortedDescending': {
            const sortedItems = state.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            })
            return sortedItems
        }
        default:
            return state
    }
}


