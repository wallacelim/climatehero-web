import {
    ADD_GOAL_STARTED,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAIL,
    DELETE_GOAL,
    EDIT_GOAL,
    UPDATE_GOALS,
    REQUEST_GOALS,
    RECEIVE_GOALS
} from "../../constants/actionTypes";

import { getActivityTypeFromString } from "../../util/activities";

const initialState = {
    isFetching: false,
    data: [],
    lastUpdated: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GOAL_STARTED:
            return {
                ...state,
                isFetching: true
            };

        case ADD_GOAL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: [
                    ...state.data,
                    {
                        ...action.payload,
                        type: getActivityTypeFromString(action.payload.type)
                    }
                ]
            };

        case ADD_GOAL_FAIL:
            return {
                ...state,
                error: action.payload.error
            };

        case DELETE_GOAL:
            return {
                ...state,
                data: [
                    ...state.data.filter(goal => goal.id !== action.payload.id)
                ]
            };
        case EDIT_GOAL:
            return {
                ...state,
                data: state.data.map(goal => {
                    if (goal.id === action.payload.id) {
                        return {
                            ...goal,
                            ...action.payload.updates
                        };
                    }
                    return goal;
                })
            };

        case UPDATE_GOALS:
            return {
                ...state,
                data: state.data.map(goal => {
                    if (goal.type === action.payload.type) {
                        const updatedCurrentFulfillment =
                            goal.fulfillment + action.payload.measurement;
                        return {
                            ...goal,
                            fulfillment: updatedCurrentFulfillment
                        };
                    }
                    return goal;
                })
            };

        case REQUEST_GOALS:
            return { ...state, isFetching: true };

        case RECEIVE_GOALS:
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
                        dateTarget
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
                        dateTarget
                    })
                ),
                lastUpdated: action.payload.receivedAt
            };
        default:
            return state;
    }
}
