import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import user from "./user";
import {
    addActivityModal,
    addGoalModal,
    editActivityModal,
    editGoalModal,
    showWelcomeModal
} from "./modals";

export default combineReducers({
    goals,
    activities,
    showWelcomeModal,
    addActivityModal,
    addGoalModal,
    editGoalModal,
    editActivityModal,
    user
});
