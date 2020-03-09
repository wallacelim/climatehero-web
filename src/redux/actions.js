import {
    ADD_GOAL,
    DELETE_GOAL,
    ADD_ACTIVITY,
    DELETE_ACTIVITY,
    TOGGLE_ADD_ACTIVITY_MODAL
} from "../constants/actionTypes";

let nextGoalId = 0;
let nextActivityId = 0;

export const addGoal = goal => ({
    type: ADD_GOAL,
    payload: {
        id: ++nextGoalId,
        goal
    }
});

export const deleteGoal = id => ({
    type: DELETE_GOAL,
    payload: {
        id
    }
});

export const addActivity = activity => ({
    type: ADD_ACTIVITY,
    payload: {
        id: ++nextActivityId,
        activity
    }
});

export const deleteActivity = id => ({
    type: DELETE_ACTIVITY,
    payload: {
        id
    }
});

export const toggleAddActivityModal = () => {
    console.log("called");
    return {
        type: TOGGLE_ADD_ACTIVITY_MODAL
    };
};
