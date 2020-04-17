/* eslint-disable no-plusplus */
import {
    ADD_ACTIVITY_STARTED,
    ADD_ACTIVITY_SUCCESS,
    ADD_ACTIVITY_FAIL,
    DELETE_ACTIVITY_STARTED,
    DELETE_ACTIVITY_SUCCESS,
    DELETE_ACTIVITY_FAIL,
    FETCH_ACTIVITIES_STARTED,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAIL,
    EDIT_ACTIVITY_STARTED,
    EDIT_ACTIVITY_SUCCESS,
} from "../../constants/actionTypes";

import {
    getActivityTypeFromString,
    activityDateTimeComparator,
} from "../../util/activities";

const initialState = {
    isFetching: false,
    data: [],
    lastUpdated: null,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY_STARTED:
            return {
                ...state,
                isFetching: true,
            };
        case ADD_ACTIVITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: [
                    ...state.data,
                    {
                        ...action.payload,
                        type: getActivityTypeFromString(action.payload.type),
                    },
                ].sort(activityDateTimeComparator),
            };
        case ADD_ACTIVITY_FAIL:
            console.log(`ADD_ACTIVITY_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };
        case DELETE_ACTIVITY_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case DELETE_ACTIVITY_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: state.data.filter(
                    (activity) => activity.id !== action.payload.id
                ),
            };

        case DELETE_ACTIVITY_FAIL:
            console.log(`DELETE_ACTIVITY_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };

        case EDIT_ACTIVITY_STARTED:
            return {
                ...state,
                isFetching: true,
            };

        case EDIT_ACTIVITY_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                isFetching: false,
                data: state.data.map((activity) => {
                    if (activity.id === action.payload.id) {
                        return {
                            ...action.payload,
                            type: getActivityTypeFromString(
                                action.payload.type
                            ),
                        };
                    }
                    return activity;
                }),
            };

        case FETCH_ACTIVITIES_STARTED:
            return { ...state, isFetching: true };

        case FETCH_ACTIVITIES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload.data.map(
                    ({
                        id,
                        userId,
                        type,
                        metric,
                        measurement,
                        reductionValue,
                        dateTimeOfActivity,
                        // UNUSED: dateTimeCreated,
                        // UNUSED: comment
                    }) => ({
                        id,
                        userId,
                        type: getActivityTypeFromString(type),
                        metric,
                        measurement,
                        reductionValue, // TODO: handle precision errors
                        dateTimeOfActivity,
                    })
                ),
                lastUpdated: action.payload.receivedAt,
            };

        case FETCH_ACTIVITIES_FAIL:
            console.log(`FETCH_ACTIVITY_FAIL: ${action.payload.error}`);
            return {
                ...state,
                error: action.payload.error,
            };

        default:
            return state;
    }
};
