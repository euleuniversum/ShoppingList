import {createReducer} from "redux-create-reducer";
import * as actionTypes from '../../actionTypes';
import {AddPurchaseAction, ChangeModalState, DeletePurchaseAction, EditPurchaseAction} from "../../actionTypes/types";
import {PurchaseActions, PurchasesStore} from "./types";

const addPurchase = (state: PurchasesStore, action: AddPurchaseAction) => ([
    ...state,
    action.payload
]);

const editPurchase = (state: PurchasesStore, action: EditPurchaseAction) => ([
    ...state.map(purchase => {
        const values = action.payload;
        if(purchase.id === values.id) {
            return {
                ...purchase,
                isEdited: false,
                title: values.title,
                quantity: values.quantity,
                price: values.price,
                whereBuy: values.whereBuy,
            }
        }

        return purchase;
    }),
]);

const deletePurchase = (state: PurchasesStore, action: DeletePurchaseAction) => ([
    ...state.filter(purchase => purchase.id !== action.payload)
]);

const changeModal = (state: PurchasesStore, action: ChangeModalState) => {
    const { purchaseId } = action.payload
    return state.map(purchase => {
        if (purchase.id === purchaseId) {
            return {
                ...purchase,
                isEdited: true
            }
        }

        return {
            ...purchase,
        }
    });
}

export const purchases = createReducer<PurchasesStore, PurchaseActions>([], {
    [actionTypes.ADD_PURCHASE]: addPurchase,
    [actionTypes.DELETE_PURCHASE]: deletePurchase,
    [actionTypes.CHANGE_MODAL_STATE]: changeModal,
    [actionTypes.EDIT_PURCHASE]: editPurchase,
})