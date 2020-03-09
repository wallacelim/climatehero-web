import { ADD_ACTIVITY, DELETE_ACTIVITY } from "../../constants/actionTypes";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_ACTIVITY:
            return [...state, action.payload];

        case DELETE_ACTIVITY:
            return [
                ...state.slice(0, action.payload.id),
                ...state.slice(++action.payload.id)
            ];
        default:
            return state;
    }
}
