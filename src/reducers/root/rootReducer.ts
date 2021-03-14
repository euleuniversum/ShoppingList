import {combineReducers} from "redux";
import {purchases} from '../purchases/purchasesReducer';
import {modal} from '../modal/modalReducer';
import { RootStore } from "./types";

export const rootReducer = combineReducers<RootStore>({
    purchases,
    modal
});