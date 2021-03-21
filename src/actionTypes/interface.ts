import {Action} from 'redux';
import * as actionTypes from './index';
import {IFormValues, ModalState, IPurchaseItem} from "../interface";

export interface IAddPurchaseAction extends Action {
    type: typeof actionTypes.ADD_PURCHASE,
    payload: IPurchaseItem,
}

export interface IEditPurchaseAction extends Action {
    type: typeof actionTypes.EDIT_PURCHASE,
    payload: IFormValues & { id: string },
}

export interface IDeletePurchaseAction extends Action {
    type: typeof actionTypes.DELETE_PURCHASE,
    payload: string
}

export interface IChangeModalState extends Action {
    type: typeof actionTypes.CHANGE_MODAL_STATE
    payload: {
        state: ModalState,
        purchaseId?: string
    }
}