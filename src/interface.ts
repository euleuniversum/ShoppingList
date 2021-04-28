import {SelectProps} from "antd";
import {Unit} from "./units";

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
    modalState: ModalState,
    replacementFor?: string
}

export interface IFormValues {
    title: string,
    quantity?: number,
    quantityUnit: Unit,
    price?: number,
    priceUnit: Unit,
    total?: number,
    whereBuy?: string,
    replacementFor?: string
}

export interface IModalFormProps {
    title?: string,
    visible?: boolean,
    replacementFor?: string,
    onClose: () => void,
    onSubmit: (values: IFormValues) => void,
    initialValues?: IFormValues
}

export interface IModalFormState {
    priceUnit: Unit,
    quantityUnit: Unit,
}

export enum ListNames {
    SHOPPING = 'ShoppingList',
    PURCHASED = 'PurchasedList',
}

export interface IPurchaseItem extends IFormValues {
    id: string,
    creationDate: Date,
    isEdited: boolean,
    listName: ListNames,
}

export interface IPurchasesStore {
    sortedPurchasesIds: string[],
    purchasesById: {
        [id: string]: IPurchaseItem
    }
}

export interface IShoppingTableProps {
    shoppingList: IPurchaseItem[],
    purchasedList: IPurchaseItem[],
    onAddReplacement: (id: string) => void,
    onEditItem: (id: string) => void,
    onDeleteItem: (id: string) => void,
    onSortItem: (ids: string[]) => void,
    onChangeListName: (ids: string[], listName: ListNames) => void,
}

export interface IShoppingTableRow extends IFormValues {
    key: string,
    creationDate: Date,
    children?: IShoppingTableRow[]
}

export interface IElementActionsProps {
    id: string,
    childrenIds: string[],
    toListName: ListNames,
    title: string,
    showChangeListButton: boolean,
    showReplacementButton: boolean,
    onAddReplacement: (id: string) => void,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void,
    onChangeListName: (ids: string[], listName: ListNames) => void,
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

export interface IDateValueProps {
    date: Date
}

export interface IPriceCellProps {
    purchase: IShoppingTableRow
}

export interface IUnitConformity {
    name: Unit,
    ratio: number,
}

export interface IDownloadCSVProps {
    headers: {
        label: string,
        key: string
    }[]
    data: IPurchaseItem[],
    text: string,
    filename: string
}