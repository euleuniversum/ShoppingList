import {createReducer} from "redux-create-reducer";
import * as actionTypes from '../../actionTypes';
import {
    IAddPurchaseAction,
    IChangeModalState, IChangeListName,
    IDeletePurchaseAction,
    IEditPurchaseAction,
    IUpdateIdsInTableState
} from "../../actionTypes/interface";
import {IPurchasesStore} from "../../interface";

type PurchaseActions =
    IAddPurchaseAction
    | IDeletePurchaseAction
    | IChangeModalState
    | IEditPurchaseAction
    | IUpdateIdsInTableState
    | IChangeListName;

const addPurchase = (state: IPurchasesStore, action: IAddPurchaseAction): IPurchasesStore => (
    {
        sortedPurchasesIds: [...state.sortedPurchasesIds, action.payload.id],
        purchasesById: {
            ...state.purchasesById,
            [action.payload.id]: action.payload
        }
    }
);

const editPurchase = (state: IPurchasesStore, action: IEditPurchaseAction): IPurchasesStore => {
    const {sortedPurchasesIds, purchasesById} = state;
    const purchase = action.payload;

    return {
        sortedPurchasesIds,
        purchasesById: {
            ...purchasesById,
            [purchase.id]: {
                ...purchasesById[purchase.id],
                ...purchase,
                isEdited: false,
                replacementFor: purchasesById[purchase.id].replacementFor
            }
        }
    }
};

const deletePurchase = (state: IPurchasesStore, action: IDeletePurchaseAction): IPurchasesStore => {
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

const changeModal = (state: IPurchasesStore, action: IChangeModalState): IPurchasesStore => {
    const {purchaseId} = action.payload;
    const {sortedPurchasesIds, purchasesById} = state;

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

const changeListName = (state: IPurchasesStore, action: IChangeListName): IPurchasesStore => {
    let {sortedPurchasesIds, purchasesById} = state;
    const {ids, listName} = action.payload;

    ids.forEach((id) => {
        purchasesById[id] = {
            ...purchasesById[id],
            listName
        }
    });

    return ({
        sortedPurchasesIds,
        purchasesById,
    });
};

export const purchases = createReducer<IPurchasesStore, PurchaseActions>({
    sortedPurchasesIds: [],
    purchasesById: {}
}, {
    [actionTypes.ADD_PURCHASE]: addPurchase,
    [actionTypes.DELETE_PURCHASE]: deletePurchase,
    [actionTypes.CHANGE_MODAL_STATE]: changeModal,
    [actionTypes.EDIT_PURCHASE]: editPurchase,
    [actionTypes.UPDATE_IDS_IN_TABLE_STATE]: updateIdsInTable,
    [actionTypes.CHANGE_LIST_NAME]: changeListName
})