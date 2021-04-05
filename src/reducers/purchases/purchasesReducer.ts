import {createReducer} from "redux-create-reducer";
import * as actionTypes from '../../actionTypes';
import {IAddPurchaseAction, IChangeModalState, IDeletePurchaseAction, IEditPurchaseAction} from "../../actionTypes/interface";
import {IPurchasesStore} from "../../interface";

type PurchaseActions = IAddPurchaseAction | IDeletePurchaseAction | IChangeModalState | IEditPurchaseAction ;

const addPurchase = (state: IPurchasesStore, action: IAddPurchaseAction) => ([
    ...state,
    action.payload
]);

const editPurchase = (state: IPurchasesStore, action: IEditPurchaseAction) => ([
    ...state.map(purchase => {
        const values = action.payload;
        if(purchase.id === values.id) {
            return {
                ...purchase,
                isEdited: false,
                ...values
            }
        }

        return purchase;
    }),
]);

const deletePurchase = (state: IPurchasesStore, action: IDeletePurchaseAction) => ([
    ...state.filter(purchase => purchase.id !== action.payload)
]);

const changeModal = (state: IPurchasesStore, action: IChangeModalState) => {
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
            isEdited: false
        }
    });
}

export const purchases = createReducer<IPurchasesStore, PurchaseActions>([], {
    [actionTypes.ADD_PURCHASE]: addPurchase,
    [actionTypes.DELETE_PURCHASE]: deletePurchase,
    [actionTypes.CHANGE_MODAL_STATE]: changeModal,
    [actionTypes.EDIT_PURCHASE]: editPurchase,
})