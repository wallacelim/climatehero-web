import {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES,
} from "../../constants/actionTypes";
// import {
//     VEGETARIAN_MEAL,
//     BIKE_RIDE,
//     BUS_RIDE
// } from "../../constants/activityTypes";

const initialState = {
    isFetching: false,
    fetched: false,
    data: [
        // {
        //     id: -1,
        //     date: getCurrentDateTimeString(),
        //     type: VEGETARIAN_MEAL,
        //     measurement: 5,
        //     metric: "meals",
        //     isRecurring: true,
        //     recurrenceValue: 2,
        //     recurrenceType: "DAY"
        //     reduction: (Math.random() * 10).toFixed(2)
        // },
        // {
        //     id: -2,
        //     date: getCurrentDateTimeString(),
        //     type: BIKE_RIDE,
        //     measurement: 30,
        //     metric: "km",
        //     recurrence: "N/A",
        //     reduction: (Math.random() * 10).toFixed(2)
        // },
        // {
        //     id: -3,
        //     date: getCurrentDateTimeString(),
        //     type: BUS_RIDE,
        //     measurement: 90,
        //     metric: "km",
        //     recurrence: "N/A",
        //     reduction: (Math.random() * 10).toFixed(2)
        // }
    ],
};

export default (state = initialState, action) => {
    switch (action.type) {
    case ADD_ACTIVITY:
        return {
            ...state,
            data: [...state.data, action.payload],
        };

    case DELETE_ACTIVITY:
        return {
            ...state,
            data: [
                ...state.data.slice(0, action.payload.id),
                ...state.data.slice(action.payload.id + 1),
            ],
        };
    case REQUEST_ACTIVITIES:
        return { ...state, isFetching: true };
    case RECEIVE_ACTIVITIES:
        return {
            ...state,
            isFetching: false,
            fetched: true,
            data: action.data,
        };
    default:
        return state;
    }
};
