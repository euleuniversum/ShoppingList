import {createReducer} from "redux-create-reducer";
import {IChangeModalState} from "../../actionTypes/interface";
import * as actionTypes from '../../actionTypes';
import {IModalStore, ModalState} from "../../interface";

const changeModalState = (state: IModalStore, action: IChangeModalState): IModalStore => ({
    modalState: action.payload.state,
    replacementFor: action.payload.replacementFor
});

export const modal = createReducer<IModalStore, IChangeModalState>({modalState: ModalState.HIDE}, {
    [actionTypes.CHANGE_MODAL_STATE]: changeModalState
});