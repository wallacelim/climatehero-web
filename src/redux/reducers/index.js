import { combineReducers } from "redux";
import goals from "./goals";
import activities from "./activities";
import showAddActivityModal from "./showAddActivityModal";

export default combineReducers({ goals, activities, showAddActivityModal });
