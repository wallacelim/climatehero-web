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
    REQUEST_GOALS,
    RECEIVE_GOALS,
    TOGGLE_ADD_ACTIVITY_MODAL,
    TOGGLE_EDIT_ACTIVITY_MODAL,
    TOGGLE_ADD_GOAL_MODAL,
    TOGGLE_WELCOME_MODAL,
    TOGGLE_EDIT_GOAL_MODAL,
    USER_LOGIN
} from "../constants/actionTypes";

export const Activity = {
    add: ({
        userId,
        type,
        metric,
        measurement,
        reductionValue,
        dateTimeOfActivity
        // UNUSED: dateTimeCreated
        // UNUSED: comment
    }) => ({
        type: ADD_ACTIVITY,
        payload: {
            userId,
            type,
            metric,
            measurement,
            reductionValue,
            dateTimeOfActivity,
            recurrence: false // TODO: standardize with backend
        }
    }),
    delete: id => ({
        type: DELETE_ACTIVITY,
        payload: {
            id
        }
    }),

    request: userId => ({
        type: REQUEST_ACTIVITIES,
        userId
    }),

    receive: json => ({
        type: RECEIVE_ACTIVITIES,
        data: json,
        receivedAt: Date.now()
    }),

    fetchAll: () => dispatch => {
        dispatch(Activity.request());
        return fetch(
            "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/activities"
        )
            .then(response => response.json())
            .then(json => dispatch(Activity.receive(json)));
    }
};

export const Goal = {
    add: ({
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
        type: ADD_GOAL,
        payload: {
            userId,
            dateCreated,
            title,
            type,
            metric,
            measurement,
            fulfillment,
            dateStart,
            dateTarget
        }
    }),

    delete: id => ({
        type: DELETE_GOAL,
        payload: {
            id
        }
    }),

    edit: (id, updates) => ({
        type: EDIT_GOAL,
        payload: {
            id,
            updates
        }
    }),

    updateAll: ({ type, measurement }) => ({
        type: UPDATE_GOALS,
        payload: {
            type,
            measurement
        }
    }),

    request: userId => ({
        type: REQUEST_GOALS,
        userId
    }),

    receive: json => ({
        type: RECEIVE_GOALS,
        data: json,
        receivedAt: Date.now()
    }),

    fetchAll: () => dispatch => {
        dispatch(Goal.request());
        return fetch(
            "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals"
        )
            .then(response => response.json())
            .then(json => dispatch(Goal.receive(json)));
    }
};

export const UI = {
    toggleAddGoalModal: () => ({
        type: TOGGLE_ADD_GOAL_MODAL
    }),

    toggleAddActivityModal: () => ({
        type: TOGGLE_ADD_ACTIVITY_MODAL
    }),

    toggleEditActivityModal: id => ({
        type: TOGGLE_EDIT_ACTIVITY_MODAL,
        payload: {
            id
        }
    }),

    toggleWelcomeModal: () => ({
        type: TOGGLE_WELCOME_MODAL
    }),

    toggleEditGoalModal: id => ({
        type: TOGGLE_EDIT_GOAL_MODAL,
        payload: {
            id
        }
    })
};

export const User = {
    loginDummyUser: () => ({
        type: USER_LOGIN,
        payload: {
            firstName: "Firstname",
            lastName: "Lastname"
        }
    })
};
