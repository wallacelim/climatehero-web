import { ADD_GOAL, DELETE_GOAL } from "../actionTypes";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.payload.goal];
        case DELETE_GOAL:
            return [
                ...state.slice(0, action.payload.id),
                ...state.slice(++action.payload.id)
            ];
        default:
            return state;
    }
}
