/* eslint-disable no-plusplus */
import {
    ADD_ACTIVITY_STARTED,
    ADD_ACTIVITY_SUCCESS,
    ADD_ACTIVITY_FAIL,
    DELETE_ACTIVITY,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES
} from "../../constants/actionTypes";

import { getActivityTypeFromString } from "../../util/activities";

const initialState = {
    isFetching: false,
    data: [],
    lastUpdated: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY_STARTED:
            return {
                ...state,
                isFetching: true
            };
        case ADD_ACTIVITY_SUCCESS:
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
        case ADD_ACTIVITY_FAIL:
            return {
                ...state,
                error: action.payload.error
            };
        case DELETE_ACTIVITY:
            return {
                ...state,
                data: [
                    ...state.data.filter(
                        activity => activity.id !== action.payload.id
                    )
                ]
            };

        case REQUEST_ACTIVITIES:
            return { ...state, isFetching: true };

        case RECEIVE_ACTIVITIES:
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
                        dateTimeOfActivity
                        // UNUSED: dateTimeCreated,
                        // UNUSED: comment
                    }) => ({
                        id,
                        userId,
                        type: getActivityTypeFromString(type),
                        metric,
                        measurement,
                        reductionValue,
                        dateTimeOfActivity
                    })
                ),
                lastUpdated: action.payload.receivedAt
            };
        default:
            return state;
    }
};
