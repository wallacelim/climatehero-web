import moment from "moment";

const DATE_FORMAT = "DD/MM/YYYY";
const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm:ss";
const TIME_FORMAT = "HH:mm:ss";

export const getCurrentDateTimeString = () => moment().format(DATE_TIME_FORMAT);

export const getCurrentDateString = () => {
    return moment().format(DATE_FORMAT);
};

export const getCurrentTimeString = () => {
    return moment().format(TIME_FORMAT);
};

export const getDateAsString = (date) => moment(date).format(DATE_FORMAT);

export const getDateTimeAsString = (dateTime) =>
    moment(dateTime).format(DATE_TIME_FORMAT);

export const getDateFromString = (dateString) =>
    moment(dateString, DATE_FORMAT);

export const getDateTimeFromString = (dateTimeString) =>
    moment(dateTimeString, DATE_TIME_FORMAT);

export const getAbbreviatedDayStringFromNumber = (dayNumber) => {
    switch (true) {
        case dayNumber === 1:
            return "1st";
        case dayNumber === 2:
            return "2nd";
        case dayNumber === 3:
            return "3rd";
        case dayNumber <= 31:
            return `${dayNumber}th`;
        default:
            throw new Error(`Invalid day number: ${dayNumber}`);
    }
};

export const getAbbreviatedMonthStringFromNumber = (monthNumber) => {
    switch (monthNumber) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
        default:
            throw new Error(`Invalid month number: ${monthNumber}`);
    }
};
