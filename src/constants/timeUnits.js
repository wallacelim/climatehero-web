import { range } from "lodash";

export const HOUR = {
    unitString: "hours",
    options: range(24),
    defaultValue: 12
};
export const DAY = {
    unitString: "days",
    options: range(1, 30),
    defaultValue: 15
};
export const MONTH = {
    unitString: "months",
    options: range(1, 12),
    defaultValue: 6
};
export const YEAR = {
    unitString: "years",
    options: range(1, 10),
    defaultValue: 2
};
