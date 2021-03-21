import {createReducer} from "redux-create-reducer";
import {IChangeModalState} from "../../actionTypes/interface";
import * as actionTypes from '../../actionTypes';
import {ModalState, IModalStore} from "../../interface";

const changeModalState = (state: IModalStore, action: IChangeModalState): IModalStore => ({
    modalState: action.payload.state
});

export const modal = createReducer<IModalStore, IChangeModalState>({modalState: ModalState.HIDE}, {
    [actionTypes.CHANGE_MODAL_STATE]: changeModalState
});