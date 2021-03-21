import {combineReducers} from "redux";
import {purchases} from '../purchases/purchasesReducer';
import {modal} from '../modal/modalReducer';
import {IRootStore} from "../../interface";

export const rootReducer = combineReducers<IRootStore>({
    purchases,
    modal
});