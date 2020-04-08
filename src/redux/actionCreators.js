import axios from "axios";

import {
    ADD_ACTIVITY_STARTED,
    ADD_ACTIVITY_SUCCESS,
    ADD_ACTIVITY_FAIL,
    DELETE_ACTIVITY,
    RECEIVE_ACTIVITIES,
    REQUEST_ACTIVITIES,
    ADD_GOAL_STARTED,
    ADD_GOAL_SUCCESS,
    ADD_GOAL_FAIL,
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
    USER_LOGIN,
} from "../constants/actionTypes";

export const Activity = {
    // TODO: backend rounding error
    addStart: () => ({ type: ADD_ACTIVITY_STARTED }),

    addSuccess: ({
        userId,
        type,
        metric,
        measurement,
        reductionValue,
        dateTimeOfActivity,
        // UNUSED: dateTimeCreated
        // UNUSED: comment
    }) => ({
        type: ADD_ACTIVITY_SUCCESS,
        payload: {
            userId,
            type,
            metric,
            measurement,
            reductionValue,
            dateTimeOfActivity,
            recurrence: false, // TODO: standardize with backend
        },
    }),

    addFail: (error) => ({
        type: ADD_ACTIVITY_FAIL,
        payload: {
            error,
        },
    }),

    add: ({
        userId,
        type,
        metric,
        measurement,
        dateTimeOfActivity,
        // UNUSED: dateTimeCreated
        // UNUSED: comment
    }) => {
        return async (dispatch) => {
            dispatch(Activity.addStart());
            console.log(dateTimeOfActivity);
            try {
                const res = await axios.post(
                    "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/activities",
                    {
                        userId,
                        type: type.name,
                        metric,
                        measurement,
                        dateTimeOfActivity,
                    }
                );
                dispatch(Activity.addSuccess(res.data));
                // eslint-disable-next-line no-use-before-define
                dispatch(Goal.updateAll(res.data));
            } catch (err) {
                dispatch(Activity.addFail(err));
            }
        };
    },

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

    receive: (data) => ({
        type: RECEIVE_ACTIVITIES,
        payload: {
            data,
            receivedAt: Date.now(),
        },
    }),

    fetchAll: () => (dispatch) => {
        dispatch(Activity.request());
        return axios
            .get(
                "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/activities"
            )
            .then((response) => dispatch(Activity.receive(response.data)));
        // TODO: add error handling
    },
};

export const Goal = {
    addStart: () => ({ type: ADD_GOAL_STARTED }),

    addSuccess: ({
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
        type: ADD_GOAL_SUCCESS,
        payload: {
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
        },
    }),

    addFail: (error) => ({
        type: ADD_GOAL_FAIL,
        payload: {
            error,
        },
    }),
    add: ({
        userId,
        title,
        type,
        metric,
        measurement,
        dateStart, // TODO: perform check
        dateTarget,
    }) => {
        return async (dispatch) => {
            dispatch(Goal.addStart());
            try {
                const res = await axios.post(
                    "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals",
                    {
                        title,
                        userId,
                        type: type.name,
                        metric,
                        measurement,
                        dateStart,
                        dateTarget,
                    }
                );
                dispatch(Goal.addSuccess(res.data));
            } catch (err) {
                dispatch(Goal.addFail(err));
            }
        };
    },

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

    request: (userId) => ({
        type: REQUEST_GOALS,
        userId,
    }),

    receive: (data) => ({
        type: RECEIVE_GOALS,
        payload: {
            data,
            receivedAt: Date.now(),
        },
    }),

    fetchAll: () => (dispatch) => {
        dispatch(Goal.request());
        return axios
            .get(
                "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals"
            )
            .then((response) => dispatch(Goal.receive(response.data)));
    },
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

    toggleWelcomeModal: () => ({
        type: TOGGLE_WELCOME_MODAL,
    }),

    toggleEditGoalModal: (id) => ({
        type: TOGGLE_EDIT_GOAL_MODAL,
        payload: {
            id,
        },
    }),
};

export const User = {
    loginDummyUser: () => ({
        type: USER_LOGIN,
        payload: {
            id: "test_user_2",
            firstName: "Firstname",
            lastName: "Lastname",
        },
    }),
};
