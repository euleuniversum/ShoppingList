import { Action } from 'redux';
import * as actionTypes from './index';
import {FormValuesType, PurchaseType} from "../reducers/purchases/types";
import {ModalState} from "../reducers/modal/types";

export interface AddPurchaseAction extends Action {
    type: typeof actionTypes.ADD_PURCHASE,
    payload: PurchaseType,
}

export interface EditPurchaseAction extends Action {
    type: typeof actionTypes.EDIT_PURCHASE,
    payload: FormValuesType & { id: string },
}

export interface DeletePurchaseAction extends Action {
    type: typeof actionTypes.DELETE_PURCHASE,
    payload: string
}

export interface ChangeModalState extends Action {
    type: typeof actionTypes.CHANGE_MODAL_STATE
    payload: {
        state: ModalState,
        purchaseId?: string
    }
}