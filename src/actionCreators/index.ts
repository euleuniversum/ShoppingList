import * as actionTypes from '../actionTypes';
import {FormValuesType} from '../reducers/purchases/types';
import {AddPurchaseAction, ChangeModalState, DeletePurchaseAction, EditPurchaseAction} from "../actionTypes/types";
import {ModalState} from "../reducers/modal/types";
import uniqid from 'uniqid';

export const addPurchaseAction = (formValues: FormValuesType): AddPurchaseAction => ({
    type: actionTypes.ADD_PURCHASE,
    payload: {
        id: uniqid(),
        isEdited: false,
        creationDate: new Date(),
        ...formValues
    },
});

export const editPurchaseAction = (id: string, formValues: FormValuesType): EditPurchaseAction => ({
    type: actionTypes.EDIT_PURCHASE,
    payload: {
        id: id,
        ...formValues
    },
});

export const deletePurchaseAction = (id: string): DeletePurchaseAction => ({
   type: actionTypes.DELETE_PURCHASE,
   payload: id
});

export const changeModalState = (state: ModalState, purchaseId?: string): ChangeModalState => ({
    type: actionTypes.CHANGE_MODAL_STATE,
    payload: {
        state,
        purchaseId
    }
});