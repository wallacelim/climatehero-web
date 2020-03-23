import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import user from "./user";
import { showAddActivityModal, showAddGoalModal } from "./showModals";

export default combineReducers({
    goals,
    activities,
    showAddActivityModal,
    showAddGoalModal,
    user,
});
