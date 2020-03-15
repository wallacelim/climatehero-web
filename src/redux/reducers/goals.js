import { ADD_GOAL, DELETE_GOAL } from "../../constants/actionTypes";

const initialState = [
    {
        progress: 100,
        text: "Sell the car, buy a horse",
        id: 1
    },
    {
        progress: 100,
        text: "Sell the car, buy a horse",
        id: 2
    },
    {
        progress: 5,
        text: "Cycle to work",
        id: 3
    },
    {
        progress: 89,
        text: "Eat veggie lunches",
        id: 4
    }
];

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
