import { range } from "lodash";
import {
    getAbbreviatedMonthStringFromNumber,
    getAbbreviatedDayStringFromNumber
} from "../util/dateTime";

export const HOUR = {
    momentString: "hour",
    unitString: "hours",
    options: range(1, 25),
    defaultValue: 12
};

export const DAY = {
    momentString: "date",
    unitString: "days",
    options: range(1, 31),
    defaultValue: 15,
    getAbbreviatedStringFromNumber: value =>
        getAbbreviatedDayStringFromNumber(value)
};

export const MONTH = {
    momentString: "month",
    unitString: "months",
    options: range(1, 12),
    defaultValue: 6,
    getAbbreviatedStringFromNumber(value) {
        return getAbbreviatedMonthStringFromNumber(value);
    }
};

export const YEAR = {
    momentString: "year",
    unitString: "years",
    options: range(1, 11),
    defaultValue: 2,
    getAbbreviatedStringFromNumber: value => String(value)
};
