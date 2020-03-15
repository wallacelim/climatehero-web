import {
    ADD_GOAL,
    DELETE_GOAL,
    UPDATE_GOALS,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    TOGGLE_ADD_ACTIVITY_MODAL,
    TOGGLE_ADD_GOAL_MODAL
} from "../constants/actionTypes";

let nextGoalId = 0;
let nextActivityId = 0;

export const addGoal = ({
    name,
    startDate,
    targetDate,
    type,
    currentMeasurement,
    targetMeasurement,
    metric,
    progress
}) => ({
    type: ADD_GOAL,
    payload: {
        id: ++nextGoalId,
        name,
        startDate,
        targetDate,
        type,
        currentMeasurement,
        targetMeasurement,
        metric,
        progress
    }
});

export const deleteGoal = id => ({
    type: DELETE_GOAL,
    payload: {
        id
    }
});

export const toggleAddGoalModal = () => ({
    type: TOGGLE_ADD_GOAL_MODAL
});

export const addActivity = ({
    date,
    type,
    measurement,
    metric,
    recurrence,
    reduction
}) => ({
    type: ADD_ACTIVITY,
    payload: {
        id: ++nextActivityId,
        date,
        type,
        measurement,
        metric,
        recurrence,
        reduction
    }
});

export const deleteActivity = id => ({
    type: DELETE_ACTIVITY,
    payload: {
        id
    }
});

export const updateGoals = ({ type, measurement }) => ({
    type: UPDATE_GOALS,
    payload: {
        type,
        measurement
    }
});

export const toggleAddActivityModal = () => ({
    type: TOGGLE_ADD_ACTIVITY_MODAL
});
