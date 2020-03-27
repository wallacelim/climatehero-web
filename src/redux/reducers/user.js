import { USER_LOGIN, USER_LOGOUT } from "../../constants/actionTypes";


const initialState = {
    isLoggedIn: false,
    data: null,
};


export default (state = initialState, action) => {
    switch (action.type) {
    case USER_LOGIN:
        return state.isLoggedIn
            ? state
            : {
                ...state,
                isLoggedIn: !state.isLoggedIn,
                data: action.payload,
            };

    case USER_LOGOUT:
        return state.isLoggedIn ? initialState : state;
    default:
        return state;
    }
};
