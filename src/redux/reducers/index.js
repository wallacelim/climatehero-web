import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import user from "./user";
import {
    addActivityModal, addGoalModal, editActivityModal, editGoalModal,
} from "./modals";

export default combineReducers({
    goals,
    activities,
    addActivityModal,
    addGoalModal,
    editGoalModal,
    editActivityModal,
    user,
});
