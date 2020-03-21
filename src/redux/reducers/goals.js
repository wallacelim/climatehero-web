import {
    ADD_GOAL,
    DELETE_GOAL,
    UPDATE_GOALS
} from "../../constants/actionTypes";
import {
    VEGETARIAN_MEAL,
    BIKE_RIDE,
    BUS_RIDE
} from "../../constants/activityTypes";

const initialState = [
    {
        id: -1,
        name: "Eat veggie meals",
        startDate: new Date().toLocaleDateString(),
        targetDate: new Date().toLocaleDateString(),
        type: VEGETARIAN_MEAL,
        currentMeasurement: 5,
        targetMeasurement: 10,
        metric: "meals",
        progress: 50
    },
    {
        id: -2,
        name: "Bike to work",
        startDate: new Date().toLocaleDateString(),
        targetDate: new Date().toLocaleDateString(),
        type: BIKE_RIDE,
        currentMeasurement: 30,
        targetMeasurement: 100,
        metric: "km",
        progress: 30
    },
    {
        id: -3,
        name: "Take the bus",
        startDate: new Date().toLocaleDateString(),
        targetDate: new Date().toLocaleDateString(),
        type: BUS_RIDE,
        currentMeasurement: 90,
        targetMeasurement: 100,
        metric: "km",
        progress: 90
    }
];

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
                    goal.progress = Math.min(
                        100,
                        Math.round(
                            (goal.currentMeasurement * 100) /
                                goal.targetMeasurement
                        )
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
