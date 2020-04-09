import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import user from "./user";
import {
    addActivityModal,
    addSeriesModal,
    addGoalModal,
    editActivityModal,
    editGoalModal,
    welcomeModal,
} from "./modals";

export default combineReducers({
    goals,
    activities,
    welcomeModal,
    addActivityModal,
    addSeriesModal,
    addGoalModal,
    editGoalModal,
    editActivityModal,
    user,
});
