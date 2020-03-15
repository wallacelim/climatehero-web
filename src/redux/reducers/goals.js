import {
    ADD_GOAL,
    DELETE_GOAL,
    UPDATE_GOALS
} from "../../constants/actionTypes";

const initialState = [];

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL:
            return [...state, action.payload];
        case DELETE_GOAL:
            return [
                ...state.slice(0, action.payload.id),
                ...state.slice(++action.payload.id)
            ];
        case UPDATE_GOALS:
            const updatedState = [...state];
            updatedState.forEach(goal => {
                if (goal.type === action.payload.type) {
                    console.log(
                        `changing ${goal.currentMeasurement} by ${action.payload.measurement}`
                    );
                    goal.currentMeasurement += action.payload.measurement;
                    console.log(goal.currentMeasurement);
                    goal.progress = Math.round(
                        (goal.currentMeasurement * 100) / goal.targetMeasurement
                    );
                    console.log(goal.progress);
                }
            });
            console.log(updatedState);
            return updatedState;
        default:
            return state;
    }
}
