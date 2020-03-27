import { TOGGLE_ADD_ACTIVITY_MODAL, TOGGLE_ADD_GOAL_MODAL, TOGGLE_WELCOME_MODAL } from "../../constants/actionTypes";


const initialState = false;

export function showAddActivityModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_ACTIVITY_MODAL:
            return !state;
        default:
            return state;
    }
}

export function showAddGoalModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_GOAL_MODAL:
            return !state;
        default:
            return state;
    }
}

export function showWelcomeModal(state = !initialState, action) {
    switch (action.type) {
    case TOGGLE_WELCOME_MODAL:
        return !state;
    default:
        return state;
    }
}
