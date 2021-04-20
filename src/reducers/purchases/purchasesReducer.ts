import {createReducer} from "redux-create-reducer";
import * as actionTypes from '../../actionTypes';
import {
    IAddPurchaseAction,
    IChangeModalState,
    IDeletePurchaseAction,
    IEditPurchaseAction,
    IUpdateIdsInTableState
} from "../../actionTypes/interface";
import { IPurchasesStore} from "../../interface";

type PurchaseActions = IAddPurchaseAction | IDeletePurchaseAction | IChangeModalState | IEditPurchaseAction | IUpdateIdsInTableState;

const addPurchase = (state: IPurchasesStore, action: IAddPurchaseAction): IPurchasesStore => (
    {
        sortedPurchasesIds: [...state.sortedPurchasesIds, action.payload.id],
        purchasesById: {
            ...state.purchasesById,
            [action.payload.id]: action.payload
        }
    }
);

const editPurchase = (state: IPurchasesStore, action: IEditPurchaseAction) : IPurchasesStore => {
    const purchase = action.payload;
    return {
        sortedPurchasesIds: state.sortedPurchasesIds,
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
    const newPurchasesIds = [...state.sortedPurchasesIds.filter(id => id !== action.payload)];
    const newPurchasesById = {
        ...state.purchasesById
    }
    delete newPurchasesById[action.payload];
    return {
        sortedPurchasesIds: newPurchasesIds,
        purchasesById: newPurchasesById
    }
};

const changeModal = (state: IPurchasesStore, action: IChangeModalState) : IPurchasesStore => {
    const { purchaseId } = action.payload;
    const { sortedPurchasesIds, purchasesById } = state;

    if (purchaseId) {

        for (let key in purchasesById) {
            purchasesById[key] = {
                ...purchasesById[key],
                isEdited: false
            }
        }
        return {
            sortedPurchasesIds: sortedPurchasesIds,
            purchasesById: {
                ...purchasesById,
                [purchaseId]: {
                    ...purchasesById[purchaseId],
                    isEdited: true
                }
            }
        }
    }
    return {
        sortedPurchasesIds: sortedPurchasesIds,
        purchasesById: purchasesById
    }
}

const updateIdsInTable = (state: IPurchasesStore, action: IUpdateIdsInTableState): IPurchasesStore => (
    {
        sortedPurchasesIds: [...action.payload],
        purchasesById: {
            ...state.purchasesById,
        }
    }
);

export const purchases = createReducer<IPurchasesStore, PurchaseActions>({
        sortedPurchasesIds: [],
        purchasesById: {}
    }, {
    [actionTypes.ADD_PURCHASE]: addPurchase,
    [actionTypes.DELETE_PURCHASE]: deletePurchase,
    [actionTypes.CHANGE_MODAL_STATE]: changeModal,
    [actionTypes.EDIT_PURCHASE]: editPurchase,
    [actionTypes.UPDATE_IDS_IN_TABLE_STATE]: updateIdsInTable
})