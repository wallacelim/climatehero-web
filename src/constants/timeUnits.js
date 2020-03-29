import { range } from "lodash";

export const HOUR = {
    unitString: "hours",
    options: range(1, 25),
    defaultValue: 12
};

export const DAY = {
    unitString: "days",
    options: range(1, 32),
    defaultValue: 15
};

export const MONTH = {
    unitString: "months",
    options: range(1, 13),
    defaultValue: 6
};

export const YEAR = {
    unitString: "years",
    options: range(1, 11),
    defaultValue: 2
};
