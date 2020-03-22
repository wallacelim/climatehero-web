import moment from "moment";

const DATE_STRING_FORMAT = "YYYY-MM-DD";
const DATE_TIME_STRING_FORMAT = "YYYY-MM-DD, h:mm:ss a";


export const getAbbreviatedMonthStringFromNumber = (monthNumber) => {
    switch (monthNumber) {
    case 1:
        return "Jan";
    case 2:
        return "Feb";
    case 3:
        return "Mar";
    case 4:
        return "Apr";
    case 5:
        return "May";
    case 6:
        return "Jun";
    case 7:
        return "Jul";
    case 8:
        return "Aug";
    case 9:
        return "Sep";
    case 10:
        return "Oct";
    case 11:
        return "Nov";
    case 12:
        return "Dec";
    default:
        return "Stub";
    }
};

export const getCurrentDateTimeString = () => moment().format();

export const getDateAsString = (date) => moment(date).format(DATE_STRING_FORMAT);

export const getDateTimeAsString = (dateTime) => moment(dateTime).format(DATE_TIME_STRING_FORMAT);

export const getDateFromString = (dateString) => moment(dateString, DATE_STRING_FORMAT);

export const getDateTimeFromString = (dateTimeString) => moment(
    dateTimeString,
    DATE_TIME_STRING_FORMAT,
);
