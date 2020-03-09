import { ADD_REDUCTION, DELETE_REDUCTION } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_REDUCTION:
            return [...state, action.payload.reduction];

        case DELETE_REDUCTION:
            return [
                ...state.slice(0, action.payload.id),
                ...state.slice(++action.payload.id)
            ];
        default:
            return state;
    }
}
