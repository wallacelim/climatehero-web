import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { Activity } from "./actionCreators";

const loggerMiddleware = createLogger();
console.log(process.env.LOCAL_API);
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

store.dispatch(Activity.fetchAll()).then(() => console.log(store.getState()));
export default store;
