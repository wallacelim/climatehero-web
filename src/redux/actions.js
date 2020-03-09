import {
    ADD_GOAL,
    DELETE_GOAL,
    ADD_REDUCTION,
    DELETE_REDUCTION
} from "./actionTypes";

let nextGoalId = 0;
let nextReductionId = 0;

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

export const addReduction = reduction => ({
    type: ADD_REDUCTION,
    payload: {
        id: ++nextReductionId,
        reduction
    }
});

export const deleteReduction = id => ({
    type: DELETE_REDUCTION,
    payload: {
        id
    }
});
