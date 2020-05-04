import {
    TOGGLE_ADD_ACTIVITY_MODAL,
    TOGGLE_ADD_SERIES_MODAL,
    TOGGLE_ADD_GOAL_MODAL,
    TOGGLE_EDIT_GOAL_MODAL,
    TOGGLE_EDIT_ACTIVITY_MODAL,
    TOGGLE_WELCOME_MODAL,
} from "../../constants/actionTypes";

const initialState = {
    isOpen: false,
    id: null,
};

export function welcomeModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_WELCOME_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                id: action.payload.id,
            };
        default:
            return state;
    }
}

export function addActivityModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_ACTIVITY_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                id: null,
            };
        default:
            return state;
    }
}

export function addSeriesModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_SERIES_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                id: null,
            };
        default:
            return state;
    }
}

export function addGoalModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_GOAL_MODAL:
            return {
                ...state,
                isOpen: !state.isOpen,
                id: null,
            };
        default:
            return state;
    }
}

export function editActivityModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_EDIT_ACTIVITY_MODAL:
            return {
                ...state,
                id: action.payload.id,
                isOpen: !state.isOpen,
            };
        default:
            return state;
    }
}

export function editGoalModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_EDIT_GOAL_MODAL:
            return {
                ...state,
                id: action.payload.id,
                isOpen: !state.isOpen,
            };
        default:
            return state;
    }
}
