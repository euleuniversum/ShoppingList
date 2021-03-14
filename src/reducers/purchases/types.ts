import {AddPurchaseAction, ChangeModalState, DeletePurchaseAction, EditPurchaseAction} from "../../actionTypes/types";

export interface FormValuesType {
    title: string,
    quantity?: number,
    price?: number,
    whereBuy?: string,
}

export interface PurchaseType extends FormValuesType {
    id: string,
    creationDate: Date,
    isEdited: boolean,
}

export interface TableRowType extends FormValuesType {
    key: string,
    creationDate: Date,
}

export interface PurchasesStore extends Array<PurchaseType> {

}

export type PurchaseActions = AddPurchaseAction | DeletePurchaseAction | ChangeModalState | EditPurchaseAction ;