import axios from "axios";

import {
    ADD_ACTIVITY_STARTED,
    ADD_ACTIVITY_SUCCESS,
    ADD_ACTIVITY_FAIL,
    DELETE_ACTIVITY_STARTED,
    DELETE_ACTIVITY_SUCCESS,
    DELETE_ACTIVITY_FAIL,
    EDIT_ACTIVITY_STARTED,
    EDIT_ACTIVITY_SUCCESS,
    EDIT_ACTIVITY_FAIL,
    FETCH_ACTIVITIES_STARTED,
    FETCH_ACTIVITIES_SUCCESS,
    FETCH_ACTIVITIES_FAIL,
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
    ADD_SERIES_STARTED,
    ADD_SERIES_SUCCESS,
    ADD_SERIES_FAIL,
    DELETE_SERIES_STARTED,
    DELETE_SERIES_SUCCESS,
    DELETE_SERIES_FAIL,
    FETCH_SERIES_STARTED,
    FETCH_SERIES_SUCCESS,
    FETCH_SERIES_FAIL,
    TOGGLE_ADD_ACTIVITY_MODAL,
    TOGGLE_EDIT_ACTIVITY_MODAL,
    TOGGLE_ADD_GOAL_MODAL,
    TOGGLE_WELCOME_MODAL,
    TOGGLE_EDIT_GOAL_MODAL,
    USER_LOGIN,
    TOGGLE_ADD_SERIES_MODAL,
} from "../constants/actionTypes";

const API_URL = "https://climatehero-web.cfapps.sap.hana.ondemand.com/api";

export const Activity = {
    _add: {
        start: () => ({ type: ADD_ACTIVITY_STARTED }),

        success: ({
            id,
            userId,
            type,
            metric,
            measurement,
            reductionValue,
            dateTimeOfActivity,
            // UNUSED: dateTimeCreated
            UNUSED: seriesId,
            // UNUSED: comment
        }) => ({
            type: ADD_ACTIVITY_SUCCESS,
            payload: {
                id,
                userId,
                type,
                metric,
                measurement,
                reductionValue,
                dateTimeOfActivity,
                seriesId,
            },
        }),

        fail: (error) => ({
            type: ADD_ACTIVITY_FAIL,
            payload: {
                error,
            },
        }),
    },

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
            dispatch(Activity._add.start());
            console.log(dateTimeOfActivity);
            try {
                const res = await axios.post(`${API_URL}/activities`, {
                    userId,
                    type: type.name,
                    metric,
                    measurement,
                    dateTimeOfActivity,
                });
                dispatch(Activity._add.success(res.data));
                dispatch(
                    // eslint-disable-next-line no-use-before-define
                    Goal.fetchByUser(userId)
                );
            } catch (err) {
                console.log(`Activity.add error: ${err}`);
                dispatch(Activity._add.fail(err));
            }
        };
    },

    _delete: {
        start: () => ({ type: DELETE_ACTIVITY_STARTED }),
        success: (id) => ({
            type: DELETE_ACTIVITY_SUCCESS,
            payload: {
                id,
            },
        }),
        fail: (error) => ({
            type: DELETE_ACTIVITY_FAIL,
            payload: {
                error,
            },
        }),
    },

    delete: ({ id, userId }) => {
        return async (dispatch) => {
            dispatch(Activity._delete.start());
            try {
                await axios.post(`${API_URL}/activities/delete/id=${id}`);
                dispatch(Activity._delete.success(id));
                dispatch(
                    // eslint-disable-next-line no-use-before-define
                    Goal.fetchByUser(userId)
                );
            } catch (err) {
                console.log(`Activity.delete error: ${err}`);
                dispatch(Activity._delete.fail(err));
            }
        };
    },
    _edit: {
        start: () => ({ type: EDIT_ACTIVITY_STARTED }),
        success: (
            {
                id,
                userId,
                type,
                metric,
                measurement,
                reductionValue,
                dateTimeOfActivity,
                // UNUSED: dateTimeCreated
                // UNUSED: seriesId
                // UNUSED: comment
            },
            previous
        ) => ({
            type: EDIT_ACTIVITY_SUCCESS,
            payload: {
                updated: {
                    id,
                    userId,
                    type,
                    metric,
                    measurement,
                    reductionValue,
                    dateTimeOfActivity,
                },
                previous,
            },
        }),
        fail: (error) => ({
            type: EDIT_ACTIVITY_FAIL,
            payload: {
                error,
            },
        }),
    },

    edit: (
        id,
        previous,
        { userId, type, metric, measurement, dateTimeOfActivity }
    ) => async (dispatch) => {
        dispatch(Activity._edit.start());
        try {
            const res = await axios.post(
                `${API_URL}/activities/edit/id=${id}`,
                {
                    userId,
                    type: type.name,
                    metric,
                    measurement,
                    dateTimeOfActivity,
                }
            );
            dispatch(Activity._edit.success(res.data, previous));
            // eslint-disable-next-line no-use-before-define
            dispatch(Goal.fetchByUser(userId));
        } catch (err) {
            console.log(`Activity.edit error: ${err}`);
            dispatch(Activity._edit.fail(err));
        }
    },

    _fetch: {
        start: (userId) => ({
            type: FETCH_ACTIVITIES_STARTED,
            userId,
        }),
        success: (data) => ({
            type: FETCH_ACTIVITIES_SUCCESS,
            payload: {
                data,
                receivedAt: Date.now(),
            },
        }),
        fail: (error) => ({
            type: FETCH_ACTIVITIES_FAIL,
            payload: {
                error,
            },
        }),
    },

    fetchAll: () => async (dispatch) => {
        dispatch(Activity._fetch.start());
        try {
            const response = await axios.get(`${API_URL}/activities`);
            return dispatch(Activity._fetch.success(response.data));
        } catch (error) {
            return dispatch(Activity._fetch.fail(error));
        }
    },

    fetchByUser: (userId) => async (dispatch) => {
        dispatch(Activity._fetch.start(userId));
        try {
            const response = await axios.get(
                `${API_URL}/activities/user=${userId}`
            );
            return dispatch(Activity._fetch.success(response.data));
        } catch (error) {
            return dispatch(Activity._fetch.fail(error));
        }
    },
};

export const Goal = {
    _add: {
        start: () => ({ type: ADD_GOAL_STARTED }),
        success: ({
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
        fail: (error) => ({
            type: ADD_GOAL_FAIL,
            payload: {
                error,
            },
        }),
    },
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
            dispatch(Goal._add.start());
            try {
                const res = await axios.post(`${API_URL}/goals`, {
                    title,
                    userId,
                    type: type.name,
                    metric,
                    measurement,
                    dateStart,
                    dateTarget,
                });
                dispatch(Goal._add.success(res.data));
            } catch (err) {
                console.log(`Goal.add error: ${err}`);
                dispatch(Goal._add.fail(err));
            }
        };
    },

    _delete: {
        start: () => ({ type: DELETE_GOAL_STARTED }),
        success: (id) => ({
            type: DELETE_GOAL_SUCCESS,
            payload: {
                id,
            },
        }),
        fail: (error) => ({
            type: DELETE_GOAL_FAIL,
            payload: {
                error,
            },
        }),
    },

    delete: (id) => {
        return async (dispatch) => {
            dispatch(Goal._delete.start());
            try {
                await axios.post(`${API_URL}/goals/delete/id=${id}`);
                dispatch(Goal._delete.success(id));
            } catch (err) {
                console.log(`Goal.delete error: ${err}`);
                dispatch(Goal._delete.fail(err));
            }
        };
    },

    _edit: {
        start: () => ({ type: EDIT_GOAL_STARTED }),
        success: ({
            id,
            userId,
            dateTimeCreated,
            title,
            type,
            metric,
            measurement,
            fulfillment,
            dateStart,
            dateTarget,
        }) => ({
            type: EDIT_GOAL_SUCCESS,
            payload: {
                id,
                userId,
                dateTimeCreated,
                title,
                type,
                metric,
                measurement,
                fulfillment,
                dateStart,
                dateTarget,
            },
        }),
        fail: (error) => ({
            type: EDIT_GOAL_FAIL,
            payload: {
                error,
            },
        }),
    },

    edit: (
        id,
        { title, userId, type, metric, measurement, dateStart, dateTarget }
    ) => async (dispatch) => {
        dispatch(Goal._edit.start());
        try {
            console.log("updates:");
            console.log({
                title,
                userId,
                type: type.name,
                metric,
                measurement,
                dateStart,
                dateTarget,
            });
            const res = await axios.post(`${API_URL}/goals/edit/id=${id}`, {
                title,
                userId,
                type: type.name,
                metric,
                measurement,
                dateStart,
                dateTarget,
            });
            dispatch(Goal._edit.success(res.data));
        } catch (err) {
            console.log(`Goal.edit error: ${err}`);
            dispatch(Goal._edit.fail(err));
        }
    },

    _fetch: {
        start: (userId) => ({
            type: FETCH_GOALS_STARTED,
            userId,
        }),
        success: (data) => ({
            type: FETCH_GOALS_SUCCESS,
            payload: {
                data,
                receivedAt: Date.now(),
            },
        }),
        fail: (error) => ({
            type: FETCH_GOALS_FAIL,
            payload: {
                error,
            },
        }),
    },

    fetchAll: () => (dispatch) => {
        dispatch(Goal._fetch.start());
        return axios
            .get(`${API_URL}/goals`)
            .then((response) => dispatch(Goal._fetch.success(response.data)))
            .catch((error) => {
                console.log(`error at Goal.fetchAll(): ${error}`);
                dispatch(Goal._fetch.fail(error));
            });
    },

    fetchByUser: (userId) => (dispatch) => {
        dispatch(Goal._fetch.start(userId));
        return axios
            .get(`${API_URL}/goals/user=${userId}`)
            .then((response) => dispatch(Goal._fetch.success(response.data)))
            .catch((error) => {
                console.log(`error at Goal.fetchAll(): ${error}`);
                dispatch(Goal._fetch.fail(error));
            });
    },
};

export const Series = {
    _add: {
        start: () => ({ type: ADD_SERIES_STARTED }),

        success: ({
            id,
            userId,
            dateTimeCreated,
            activityType,
            activityMetric,
            activityMeasurement,
            seriesFirstDate,
            seriesLastDate,
            seriesCycle,
            comment,
        }) => ({
            type: ADD_SERIES_SUCCESS,
            payload: {
                id,
                userId,
                dateTimeCreated,
                activityType,
                activityMetric,
                activityMeasurement,
                seriesFirstDate,
                seriesLastDate,
                seriesCycle,
                comment,
            },
        }),

        fail: (error) => ({
            type: ADD_SERIES_FAIL,
            payload: {
                error,
            },
        }),
    },

    add: ({
        userId,
        activityType,
        activityMetric,
        activityMeasurement,
        seriesFirstDate,
        seriesLastDate,
        seriesCycle,
    }) => {
        return async (dispatch) => {
            dispatch(Series._add.start());
            console.log({
                userId,
                activityType: activityType.name,
                activityMetric,
                activityMeasurement,
                seriesFirstDate,
                seriesLastDate,
                seriesCycle: seriesCycle.value,
            });
            try {
                const res = await axios.post(`${API_URL}/series`, {
                    userId,
                    activityType: activityType.name,
                    activityMetric,
                    activityMeasurement,
                    seriesFirstDate,
                    seriesLastDate,
                    seriesCycle: seriesCycle.value,
                });
                dispatch(Series._add.success(res.data));
                // Handle updating of goals
            } catch (err) {
                console.log(`Series.add error: ${err}`);
                dispatch(Series._add.fail(err));
            }
        };
    },

    _delete: {
        start: () => ({ type: DELETE_SERIES_STARTED }),
        success: (id) => ({
            type: DELETE_SERIES_SUCCESS,
            payload: {
                id,
            },
        }),
        fail: (error) => ({
            type: DELETE_SERIES_FAIL,
            payload: {
                error,
            },
        }),
    },

    delete: (id) => {
        return async (dispatch) => {
            dispatch(Series._delete.start());
            try {
                await axios.post(`${API_URL}/series/delete/id=${id}`);
                dispatch(Series._delete.success(id));
                // TODO: handle updating of goals
            } catch (err) {
                console.log(`Series.delete error: ${err}`);
                dispatch(Series._delete.fail(err));
            }
        };
    },

    _fetch: {
        start: (userId) => ({
            type: FETCH_SERIES_STARTED,
            userId,
        }),
        success: (data) => ({
            type: FETCH_SERIES_SUCCESS,
            payload: {
                data,
                receivedAt: Date.now(),
            },
        }),
        fail: (error) => ({
            type: FETCH_SERIES_FAIL,
            payload: {
                error,
            },
        }),
    },

    fetchById: (id) => async (dispatch) => {
        dispatch(Series._fetch.start());
        try {
            const response = await axios.get(`${API_URL}/series/id=${id}`);
            return dispatch(Series._fetch.success(response.data));
        } catch (error) {
            return dispatch(Series._fetch.fail(error));
        }
    },

    fetchByUserId: (userId) => async (dispatch) => {
        dispatch(Series._fetch.start());
        try {
            const response = await axios.get(
                `${API_URL}/series/user=${userId}`
            );
            return dispatch(Series._fetch.success(response.data));
        } catch (error) {
            return dispatch(Series._fetch.fail(error));
        }
    },

    fetchAll: () => async (dispatch) => {
        dispatch(Series._fetch.start());
        try {
            const response = await axios.get(`${API_URL}/series`);
            return dispatch(Series._fetch.success(response.data));
        } catch (error) {
            return dispatch(Series._fetch.fail(error));
        }
    },
};

export const UI = {
    toggleAddGoalModal: () => ({
        type: TOGGLE_ADD_GOAL_MODAL,
    }),

    toggleAddActivityModal: () => ({
        type: TOGGLE_ADD_ACTIVITY_MODAL,
    }),

    toggleAddSeriesModal: () => ({
        type: TOGGLE_ADD_SERIES_MODAL,
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
