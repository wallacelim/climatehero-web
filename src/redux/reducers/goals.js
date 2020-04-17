import {
    ADD_GOAL_STARTED,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAIL,
    DELETE_GOAL_STARTED,
    DELETE_GOAL_SUCCESS,
    DELETE_GOAL_FAIL,
    EDIT_GOAL_STARTED,
    EDIT_GOAL_SUCCESS,
    EDIT_GOAL_FAIL,
    FETCH_GOALS_STARTED,
    FETCH_GOALS_SUCCESS,
    FETCH_GOALS_FAIL,
} from "../../constants/actionTypes";

import { getActivityTypeFromString } from "../../util/activities";
import { goalDateComparator } from "../../util/goals";

const initialState = {
    isFetching: false, // TODO: utilize this for user feedback
    data: [],
    lastUpdated: null,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case ADD_GOAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: [
                    ...state.data,
                    {
                        ...action.payload,
                        type: getActivityTypeFromString(action.payload.type),
                    },
                ].sort(goalDateComparator),
            };

        case ADD_GOAL_FAIL:
            console.log(`ADD_GOAL_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };

        case DELETE_GOAL_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case DELETE_GOAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: state.data.filter(
                    (goal) => goal.id !== action.payload.id
                ),
            };

        case DELETE_GOAL_FAIL:
            console.log(`DELETE_GOAL_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };

        case EDIT_GOAL_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case EDIT_GOAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: state.data
                    .map((goal) => {
                        if (goal.id === action.payload.id) {
                            return {
                                ...action.payload,
                                type: getActivityTypeFromString(
                                    action.payload.type
                                ),
                            };
                        }
                        return goal;
                    })
                    .sort(goalDateComparator),
            };

        case EDIT_GOAL_FAIL:
            console.log(`EDIT_GOAL_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };

        case FETCH_GOALS_STARTED:
            return { ...state, isFetching: true };

        case FETCH_GOALS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload.data.map(
                    ({
                        id,
                        userId,
                        dateCreated,
                        title,
                        type,
                        metric,
                        measurement,
                        fulfillment,
                        dateStart,
                        dateTarget,
                    }) => ({
                        id,
                        userId,
                        dateCreated,
                        title,
                        type: getActivityTypeFromString(type),
                        metric,
                        measurement,
                        fulfillment,
                        dateStart,
                        dateTarget,
                    })
                ),
                lastUpdated: action.payload.receivedAt,
            };

        case FETCH_GOALS_FAIL:
            console.log(`FETCH_GOALS_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
