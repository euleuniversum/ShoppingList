import {createReducer} from "redux-create-reducer";
import { ChangeModalState } from "../../actionTypes/types";
import {ModalStore} from "./types";
import * as actionTypes from '../../actionTypes';

const changeModalState = (state: ModalStore, action: ChangeModalState): ModalStore => ({
    state: action.payload.state
});

export const modal = createReducer<ModalStore, ChangeModalState>({state: 'hide'}, {
    [actionTypes.CHANGE_MODAL_STATE]: changeModalState
});