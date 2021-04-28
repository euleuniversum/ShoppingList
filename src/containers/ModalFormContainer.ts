import {connect} from "react-redux";
import ModalForm from "../components/ModalForm/ModalForm";
import {addPurchaseAction, changeModalState, editPurchaseAction} from "../actionCreators";
import {IFormValues, IModalStore, IPurchaseItem, IRootStore, ModalState} from "../interface";
import {Unit} from "../units";

const getModalProps = (modalStore: IModalStore, purchaseValues: IPurchaseItem | undefined) => {
    const defaultModalProps = {
        visible: false,
        state: modalStore.modalState,
    }

    switch (modalStore.modalState) {
        case ModalState.CREATE:
            return {
                title: 'Добавить элемент',
                visible: true,
                state: modalStore.modalState,
                replacementFor: modalStore.replacementFor,
                initialValues: {
                    quantityUnit: Unit.PIECE,
                    priceUnit: Unit.ALL
                }
            }
        case ModalState.EDIT: {
            if (purchaseValues) {
                return {
                    title: 'Редактировать элемент',
                    visible: true,
                    initialValues: {
                        title: purchaseValues.title,
                        quantity: purchaseValues.quantity,
                        quantityUnit: purchaseValues.quantityUnit,
                        price: purchaseValues.price,
                        priceUnit: purchaseValues.priceUnit,
                        whereBuy: purchaseValues.whereBuy
                    },
                    state: modalStore.modalState,
                }
            }
            return defaultModalProps;
        }
        case ModalState.HIDE:
        default:
            return defaultModalProps;
    }
};

export default connect(
    (state: IRootStore) => ({state}),
    (dispatch) => ({dispatch}),
    (stateProps, dispatchProps) => {
        const {state} = stateProps;
        const {dispatch} = dispatchProps;
        const {modal} = state;
        const purchaseValues = Object.values(state.purchases.purchasesById).find(purchase => purchase.isEdited);
        return {
            ...getModalProps(modal, purchaseValues),
            onClose: () => dispatch(changeModalState(ModalState.HIDE)),
            onSubmit: (values: IFormValues) => {
                if (modal.modalState === ModalState.CREATE) {
                    dispatch(addPurchaseAction(values));
                } else if (modal.modalState === ModalState.EDIT && purchaseValues?.id) {
                    dispatch(editPurchaseAction(purchaseValues?.id, values));
                }
            },
        }
    }
)(ModalForm);