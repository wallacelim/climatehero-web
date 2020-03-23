import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Activity, User } from "./actionCreators";

const loggerMiddleware = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware),
);

store.dispatch(Activity.fetchAll());
store.dispatch(User.loginDummyUser());
export default store;
