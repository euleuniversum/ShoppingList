import * as actionTypes from '../actionTypes';
import {
    IAddPurchaseAction,
    IChangeModalState, IChangePurchased,
    IDeletePurchaseAction,
    IEditPurchaseAction, IUpdateIdsInTableState
} from "../actionTypes/interface";
import { nanoid } from 'nanoid';
import {IFormValues, ModalState} from "../interface";

export const addPurchaseAction = (formValues: IFormValues): IAddPurchaseAction => ({
    type: actionTypes.ADD_PURCHASE,
    payload: {
        id: nanoid(),
        isEdited: false,
        isPurchased: false,
        creationDate: new Date(),
        ...formValues
    },
});

export const editPurchaseAction = (id: string, formValues: IFormValues): IEditPurchaseAction => ({
    type: actionTypes.EDIT_PURCHASE,
    payload: {
        id: id,
        ...formValues
    },
});

export const deletePurchaseAction = (id: string): IDeletePurchaseAction => ({
    type: actionTypes.DELETE_PURCHASE,
    payload: id
});

export const changeModalState = (state: ModalState, purchaseId?: string, replacementFor?: string): IChangeModalState => ({
    type: actionTypes.CHANGE_MODAL_STATE,
    payload: {
        state,
        purchaseId,
        replacementFor
    }
});

export const updateIdsInTableState = (ids: string[]): IUpdateIdsInTableState => ({
    type: actionTypes.UPDATE_IDS_IN_TABLE_STATE,
    payload: ids
});

export const changePurchased = (ids: string[], isPurchased: boolean): IChangePurchased => ({
    type: actionTypes.CHANGE_PURCHASED,
    payload: {
        ids,
        isPurchased
    }
});