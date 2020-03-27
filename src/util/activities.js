import {
    WALKING,
    BIKE_RIDE,
    BUS_RIDE,
    TRAIN_RIDE,
    VEGETARIAN_MEAL
} from "../constants/activityTypes";

export const getActivityTypeFromString = activityString => {
    switch (activityString) {
        case WALKING.name:
            return WALKING;
        case BIKE_RIDE.name:
            return BIKE_RIDE;
        case BUS_RIDE.name:
            return BUS_RIDE;
        case TRAIN_RIDE.name:
            return TRAIN_RIDE;
        case VEGETARIAN_MEAL.name:
            return VEGETARIAN_MEAL;
        default:
            throw new Error("Error setting activityType");
    }
};

export const stub = "STUB";
