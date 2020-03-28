import {
    WALKING,
    COMMUTE_BIKE,
    COMMUTE_BUS,
    COMMUTE_TRAIN,
    MEAL_VEGETARIAN
} from "../constants/activityTypes";

export const getActivityTypeFromString = activityString => {
    switch (activityString) {
        case WALKING.name:
            return WALKING;
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

export const stub = "STUB";
