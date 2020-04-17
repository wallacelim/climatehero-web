import { range } from "lodash";
import moment from "moment";
import {
    COMMUTE_BIKE,
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    MEAL_VEGETARIAN,
} from "../constants/activityTypes";
import { getDateTimeFromString, dateTimeComparator } from "./datetime";

export const getActivityTypeFromString = (activityString) => {
    switch (activityString) {
        case COMMUTE_BIKE.name:
            return COMMUTE_BIKE;
        case COMMUTE_BUS.name:
            return COMMUTE_BUS;
        case COMMUTE_TRAIN.name:
            return COMMUTE_TRAIN;
        case MEAL_VEGETARIAN.name:
            return MEAL_VEGETARIAN;
        default:
            throw new Error("Error setting activityType");
    }
};

export const filterAndGroupActivitiesByTime = (
    activities,
    timeValue,
    timeUnit
) => {
    const startMoment = moment().subtract(timeValue, timeUnit.unitString);
    const endMoment = moment();
    const timeToReductionMapping = {};
    const currentMoment = moment().subtract(timeValue, timeUnit.unitString);
    range(timeValue + 1).forEach(() => {
        const currentTimeValue = currentMoment.get(timeUnit.momentString);
        // eslint-disable-next-line no-param-reassign
        timeToReductionMapping[
            timeUnit.getAbbreviatedStringFromNumber(currentTimeValue)
        ] = activities.reduce((totalReduction, activity) => {
            const activityMoment = getDateTimeFromString(
                activity.dateTimeOfActivity
            );
            if (
                activityMoment.isBetween(
                    startMoment,
                    endMoment,
                    timeUnit.momentString,
                    []
                ) &&
                activityMoment.get(timeUnit.momentString) === currentTimeValue
            ) {
                return totalReduction + activity.reductionValue;
            }
            return totalReduction;
        }, 0);
        currentMoment.add(1, timeUnit.unitString);
    });
    return timeToReductionMapping;
};

export const activityDateTimeComparator = (activity1, activity2) =>
    dateTimeComparator(
        getDateTimeFromString(activity1.dateTimeOfActivity),
        getDateTimeFromString(activity2.dateTimeOfActivity)
    );
