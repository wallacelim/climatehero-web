import fetch from "cross-fetch";
import {
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    RECEIVE_ACTIVITIES,
    REQUEST_ACTIVITIES,
    ADD_GOAL,
    DELETE_GOAL,
    EDIT_GOAL,
    UPDATE_GOALS,
    TOGGLE_ADD_ACTIVITY_MODAL,
    TOGGLE_EDIT_ACTIVITY_MODAL,
    TOGGLE_ADD_GOAL_MODAL,
    TOGGLE_EDIT_GOAL_MODAL,
    USER_LOGIN,
} from "../constants/actionTypes";

const nextGoalId = 0;
const nextActivityId = 0;

export const Goal = {
    add: ({
        name,
        startDate,
        targetDate,
        type,
        currentMeasurement,
        targetMeasurement,
        metric,
        progress,
    }) => ({
        type: ADD_GOAL,
        payload: {
            id: nextGoalId + 1,
            name,
            startDate,
            targetDate,
            type,
            currentMeasurement,
            targetMeasurement,
            metric,
            progress,
        },
    }),

    delete: (id) => ({
        type: DELETE_GOAL,
        payload: {
            id,
        },
    }),

    edit: (id, updates) => ({
        type: EDIT_GOAL,
        payload: {
            id,
            updates,
        },
    }),

    updateAll: ({ type, measurement }) => ({
        type: UPDATE_GOALS,
        payload: {
            type,
            measurement,
        },
    }),
};


export const UI = {
    toggleAddGoalModal: () => ({
        type: TOGGLE_ADD_GOAL_MODAL,

    }),

    toggleAddActivityModal: () => ({
        type: TOGGLE_ADD_ACTIVITY_MODAL,
    }),

    toggleEditActivityModal: (id) => ({
        type: TOGGLE_EDIT_ACTIVITY_MODAL,
        payload: {
            id,
        },
    }),

    toggleEditGoalModal: (id) => ({
        type: TOGGLE_EDIT_GOAL_MODAL,
        payload: {
            id,
        },
    }),
};

export const Activity = {
    add: ({
        date, type, measurement, metric, recurrence, reduction,
    }) => ({
        type: ADD_ACTIVITY,
        payload: {
            id: nextActivityId + 1,
            date,
            type,
            measurement,
            metric,
            recurrence,
            reduction,
        },
    }),
    delete: (id) => ({
        type: DELETE_ACTIVITY,
        payload: {
            id,
        },
    }),

    request: (userId) => ({
        type: REQUEST_ACTIVITIES,
        userId,
    }),
    receive: (json) => ({
        type: RECEIVE_ACTIVITIES,
        data: json,
        receivedAt: Date.now(),
    }),

    fetchAll: () => (dispatch) => {
        dispatch(Activity.request());
        return fetch("http://localhost:8080/reductions")
            .then((response) => response.json())
            .then((json) => dispatch(Activity.receive(json)));
    },
};

export const User = {
    loginDummyUser: () => ({
        type: USER_LOGIN,
        payload: {
            firstName: "Firstname",
            lastName: "Lastname",
        },
    }),
};
