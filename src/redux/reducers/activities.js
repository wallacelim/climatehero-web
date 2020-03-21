import {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES
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
        //     date: new Date().toLocaleDateString(),
        //     type: VEGETARIAN_MEAL,
        //     measurement: 5,
        //     metric: "meals",
        //     recurrence: "N/A",
        //     reduction: (Math.random() * 10).toFixed(2)
        // },
        // {
        //     id: -2,
        //     date: new Date().toLocaleDateString(),
        //     type: BIKE_RIDE,
        //     measurement: 30,
        //     metric: "km",
        //     recurrence: "N/A",
        //     reduction: (Math.random() * 10).toFixed(2)
        // },
        // {
        //     id: -3,
        //     date: new Date().toLocaleDateString(),
        //     type: BUS_RIDE,
        //     measurement: 90,
        //     metric: "km",
        //     recurrence: "N/A",
        //     reduction: (Math.random() * 10).toFixed(2)
        // }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            return Object.assign({}, state, action.payload);

        case DELETE_ACTIVITY:
            return [
                ...state,
                ...state.data.slice(0, action.payload.id),
                ...state.data.slice(++action.payload.id)
            ];
        case REQUEST_ACTIVITIES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_ACTIVITIES:
            console.log(action);
            return Object.assign({}, state, {
                isFetching: false,
                fetched: true,
                data: action.data
            });
        default:
            return state;
    }
};
