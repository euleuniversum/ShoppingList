import {applyMiddleware, createStore} from "redux";
import {rootReducer} from "../reducers/root/rootReducer";
import {logger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));