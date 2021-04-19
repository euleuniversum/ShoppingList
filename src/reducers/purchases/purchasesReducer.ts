import {createReducer} from "redux-create-reducer";
import * as actionTypes from '../../actionTypes';
import {IAddPurchaseAction, IChangeModalState, IDeletePurchaseAction, IEditPurchaseAction} from "../../actionTypes/interface";
import { IPurchasesStore} from "../../interface";

type PurchaseActions = IAddPurchaseAction | IDeletePurchaseAction | IChangeModalState | IEditPurchaseAction ;

const addPurchase = (state: IPurchasesStore, action: IAddPurchaseAction): IPurchasesStore => (
    {
        purchasesIds: [...state.purchasesIds, action.payload.id],
        purchasesById: {
            ...state.purchasesById,
            [action.payload.id]: action.payload
        }
    }
);

const editPurchase = (state: IPurchasesStore, action: IEditPurchaseAction) : IPurchasesStore => {
    const purchase = action.payload;
    return {
        purchasesIds: state.purchasesIds,
        purchasesById: {
            ...state.purchasesById,
            [purchase.id]: {
                ...state.purchasesById[purchase.id],
                isEdited: false,
                ...purchase
            }
        }
    }
};

const deletePurchase = (state: IPurchasesStore, action: IDeletePurchaseAction) : IPurchasesStore => {
    const newPurchasesIds = [...state.purchasesIds.filter(id => id !== action.payload)];
    const newPurchasesById = {
        ...state.purchasesById
    }
    delete newPurchasesById[action.payload];
    return {
        purchasesIds: newPurchasesIds,
        purchasesById: newPurchasesById
    }
};

const changeModal = (state: IPurchasesStore, action: IChangeModalState) : IPurchasesStore => {
    const { purchaseId } = action.payload;
    const { purchasesIds, purchasesById } = state;

    if (purchaseId) {
        for (let key in purchasesById) {
            purchasesById[key] = {
                ...purchasesById[key],
                isEdited: false
            }
        }
        return {
            purchasesIds: purchasesIds,
            purchasesById: {
                ...purchasesById,
                [purchaseId]: {
                    ...purchasesById[purchaseId],
                    isEdited: true
                }
            }
        }
    } else {
        return {
            purchasesIds: purchasesIds,
            purchasesById: purchasesById
        }
    }
}

export const purchases = createReducer<IPurchasesStore, PurchaseActions>({
        purchasesIds: [],
        purchasesById: {}
    }, {
    [actionTypes.ADD_PURCHASE]: addPurchase,
    [actionTypes.DELETE_PURCHASE]: deletePurchase,
    [actionTypes.CHANGE_MODAL_STATE]: changeModal,
    [actionTypes.EDIT_PURCHASE]: editPurchase,
})