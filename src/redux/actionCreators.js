import axios from "axios";

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
import { getActivityTypeFromString } from "../util/activities";

export const Activity = {
    _add: {
        start: () => ({ type: ADD_ACTIVITY_STARTED }),

        success: ({
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

        fail: (error) => ({
            type: ADD_ACTIVITY_FAIL,
            payload: {
                error,
            },
        }),
        // TODO: backend rounding error
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
                dispatch(Activity._add.success(res.data));
                dispatch(
                    // eslint-disable-next-line no-use-before-define
                    Goal._update.byType(
                        getActivityTypeFromString(res.data.type),
                        res.data.measurement
                    )
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

    delete: ({ id, type, measurement }) => {
        return async (dispatch) => {
            dispatch(Activity._delete.start());
            try {
                await axios.post(
                    `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/activities/delete/id=${id}`
                );
                dispatch(Activity._delete.success(id));
                dispatch(
                    // eslint-disable-next-line no-use-before-define
                    Goal._update.byType(type, -measurement)
                );
            } catch (err) {
                console.log(`Activity.delete error: ${err}`);
                dispatch(Activity._delete.fail(err));
            }
        };
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
            const response = await axios.get(
                "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/activities"
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

    delete: ({ id }) => {
        return async (dispatch) => {
            dispatch(Goal._delete.start());
            try {
                await axios.post(
                    `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals/delete/id=${id}`
                );
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
                type: getActivityTypeFromString(type),
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
            const res = await axios.post(
                `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals/edit/id=${id}`,
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
            dispatch(Goal._edit.success(res.data));
        } catch (err) {
            console.log(`Goal.edit error: ${err}`);
            dispatch(Goal._edit.fail(err));
        }
    },

    _update: {
        byType: (type, value) => async (dispatch, getState) => {
            const { goals } = getState();
            goals.data.forEach((goal) => {
                if (goal.type === type) {
                    dispatch(
                        Goal.edit(goal.id, {
                            ...goal,
                            fulfillment: goal.fulfillment + value,
                        })
                    );
                }
            });
            dispatch(Goal.fetchAll());
        },
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
            .get(
                "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/goals"
            )
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
                const res = await axios.post(
                    "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/series",
                    {
                        userId,
                        activityType: activityType.name,
                        activityMetric,
                        activityMeasurement,
                        seriesFirstDate,
                        seriesLastDate,
                        seriesCycle: seriesCycle.value,
                    }
                );
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
                await axios.post(
                    `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/series/delete/id=${id}`
                );
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
            const response = await axios.get(
                `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/series/id=${id}`
            );
            return dispatch(Series._fetch.success(response.data));
        } catch (error) {
            return dispatch(Series._fetch.fail(error));
        }
    },

    fetchByUserId: (userId) => async (dispatch) => {
        dispatch(Series._fetch.start());
        try {
            const response = await axios.get(
                `https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/series/user=${userId}`
            );
            return dispatch(Series._fetch.success(response.data));
        } catch (error) {
            return dispatch(Series._fetch.fail(error));
        }
    },

    fetchAll: () => async (dispatch) => {
        dispatch(Series._fetch.start());
        try {
            const response = await axios.get(
                "https://climatehero-server-happy-civet-jc.cfapps.sap.hana.ondemand.com/series"
            );
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
