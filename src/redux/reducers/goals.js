import {
    ADD_GOAL,
    DELETE_GOAL,
    EDIT_GOAL,
    UPDATE_GOALS,
} from "../../constants/actionTypes";
import {
    VEGETARIAN_MEAL,
    BIKE_RIDE,
    BUS_RIDE,
} from "../../constants/activityTypes";

const initialState = {
    isFetching: false,
    fetched: false,
    data: [
        {
            id: -1,
            name: "Eat veggie meals",
            startDate: new Date().toLocaleDateString(),
            targetDate: new Date().toLocaleDateString(),
            type: VEGETARIAN_MEAL,
            currentMeasurement: 5,
            targetMeasurement: 10,
            metric: "meals",
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
        },
    ],
};

export default function (state = initialState, action) {
    switch (action.type) {
    case ADD_GOAL:
        return {
            ...state,
            data: [...state.data, action.payload],
        };
    case DELETE_GOAL:
        return {
            ...state,
            data: [
                ...state.data.slice(0, action.payload.id),
                ...state.slice(action.payload.id + 1),
            ],
        };
    case EDIT_GOAL:
        return {
            ...state,
            data: state.data.map((goal) => {
                if (goal.id === action.payload.id) {
                    console.log(goal);
                    console.log(action);
                    return {
                        ...goal,
                        ...action.payload.updates,
                    };
                }
                return goal;
            }),
        };
    case UPDATE_GOALS:
        return {
            ...state,
            data: state.data.map((goal) => {
                if (goal.type === action.payload.type) {
                    const updatedCurrentMeasurement = goal.currentMeasurement
                    + action.payload.measurement;
                    return {
                        ...goal,
                        currentMeasurement: updatedCurrentMeasurement,
                    };
                }
                return goal;
            }),
        };
    default:
        return state;
    }
}
