import React from "react";
import {SelectProps} from "antd";

export interface IRootStore {
    purchases: IPurchasesStore,
    modal: IModalStore
}

export enum ModalState {
    CREATE = 'create',
    EDIT = 'edit',
    HIDE = 'hide'
}

export interface IModalStore {
    modalState: ModalState
}

export interface IFormValues {
    title: string,
    quantity?: number,
    price?: number,
    whereBuy?: string,
}

export interface IModalFormProps {
    title?: string,
    visible?: boolean,
    onClose: () => void,
    onSubmit: (values: IFormValues) => void,
    initialValues?: IFormValues
}

export interface IModalFormState {
}

export interface IPurchaseItem extends IFormValues {
    id: string,
    creationDate: Date,
    isEdited: boolean,
}

export interface IPurchasesStore extends Array<IPurchaseItem> {

}

export interface IShoppingTableProps {
    purchases: IPurchaseItem[],
    onEditItem: (id: string) => void,
    onDeleteItem: (id: string) => void,
}

export interface IShoppingTableRow extends IFormValues {
    key: string,
    creationDate: Date,
}

export interface IElementActionsProps {
    id: string,
    title: string,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}

export interface IAddingSelectProps extends SelectProps<string> {
    addButtonText: string,
    items: string[],
    dispatch: any,
}

export interface IAddingSelectState {
    inputValue: string,
    newItem: string,
}

export interface AddButtonProps {
    menu: React.ReactElement,
    text: string,
    onClick: () => void
}

export interface IDateValueProps {
    date: Date
}