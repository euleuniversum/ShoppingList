import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducers/root/rootReducer";
import {logger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(
    rootReducer,
    (localStorage['redux-store'] ? JSON.parse(localStorage['redux-store']) : undefined),
    composeWithDevTools(applyMiddleware(logger))
);

store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify((store.getState()))
});