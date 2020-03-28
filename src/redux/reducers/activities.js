/* eslint-disable no-plusplus */
import {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    REQUEST_ACTIVITIES,
    RECEIVE_ACTIVITIES
} from "../../constants/actionTypes";

import { getActivityTypeFromString } from "../../util/activities";

const initialState = {
    isFetching: false,
    fetched: false,
    data: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                data: [...state.data, action.payload]
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
                fetched: true,
                data: action.data.map(
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
                )
            };
        default:
            return state;
    }
};
