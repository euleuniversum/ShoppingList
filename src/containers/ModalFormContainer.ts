import {connect} from "react-redux";
import ModalForm from "../conponents/ModalForm/ModalForm";
import {addPurchaseAction, changeModalState, editPurchaseAction} from "../actionCreators";
import {ModalState, IRootStore, IFormValues, IPurchaseItem} from "../interface";

const getModalProps = (modalState: ModalState, purchaseValues: IPurchaseItem | undefined) => {
    const defaultModalProps = {
        visible: false,
        state: modalState,
    }

    switch (modalState) {
        case ModalState.CREATE:
            return {
                title: 'Добавить элемент',
                visible: true,
                state: modalState,
                initialValues: {
                    unit: Unit.ALL,
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
                        price: purchaseValues.price,
                        whereBuy: purchaseValues.whereBuy,
                    },
                    state: modalState,
                }
            } return defaultModalProps;
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
        const modalState = state.modal.modalState;
        const purchaseValues = state.purchases.find(purchase => purchase.isEdited);
        return {
            ...getModalProps(modalState, purchaseValues),
            onClose: () => dispatch(changeModalState(ModalState.HIDE)),
            onSubmit: (values: IFormValues) => {
                if (modalState === ModalState.CREATE) {
                    dispatch(addPurchaseAction(values));
                } else if (modalState === ModalState.EDIT && purchaseValues?.id) {
                        dispatch(editPurchaseAction(purchaseValues?.id, values));
                }
            },
        }
    }
)(ModalForm);