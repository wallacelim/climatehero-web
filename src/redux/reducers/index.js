import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import { showAddActivityModal, showAddGoalModal, showWelcomeModal } from "./showModals";

export default combineReducers({
    goals,
    activities,
    showAddActivityModal,
    showAddGoalModal,
    showWelcomeModal,
});
