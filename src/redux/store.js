import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Activity, User, Goal } from "./actionCreators";

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;

store.dispatch(User.loginDummyUser());
const { user } = store.getState();
if (user.isLoggedIn) {
    store.dispatch(Activity.fetchByUser(user.data.id));
    store.dispatch(Goal.fetchByUser(user.data.id));
}
