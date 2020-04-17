import { dateComparator, getDateFromString } from "./datetime";

export const STUB = "TO_REMOVE";

export const goalDateComparator = (goal1, goal2) =>
    dateComparator(
        getDateFromString(goal1.dateTarget),
        getDateFromString(goal2.dateTarget)
    );
