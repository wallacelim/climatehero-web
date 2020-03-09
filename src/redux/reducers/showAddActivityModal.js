import { TOGGLE_ADD_ACTIVITY_MODAL } from "../../constants/actionTypes";

const initialState = false;

export default function showAddActivityModal(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADD_ACTIVITY_MODAL:
            return !state;
        default:
            return state;
    }
}
