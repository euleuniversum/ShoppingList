import {connect} from "react-redux";
import ModalForm from "../conponents/ModalForm/ModalForm";
import {RootStore} from "../reducers/root/types";
import {addPurchaseAction, changeModalState, editPurchaseAction} from "../actionCreators";
import {FormValuesType} from "../reducers/purchases/types";

const getModalProps = (state: RootStore) => {
    const modalState = state.modal.state;
    switch (modalState) {
        case 'create':
            return {
                title: 'Добавить элемент',
                visible: true,
                state: modalState,
            }
        case 'edit': {
            const purchaseValues = state.purchases.find(purchase => purchase.isEdited);
            if(purchaseValues) {
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
            } else {
                return {
                    visible: false,
                    state: modalState,
                }
            }
        }
        case "hide":
        default:
            return  {
                visible: false,
                state: modalState,
            }
    }
};

export default connect(
    (state: RootStore) => ({state}),
    (dispatch) => ({dispatch}),
    (stateProps, dispatchProps) => {
        const {state} = stateProps;
        const {dispatch} = dispatchProps;

        return {
            ...getModalProps(state),
            onClose: () => dispatch(changeModalState('hide')),
            onSubmit: (values: FormValuesType) => {
                const modalState = state.modal.state;
                if(modalState === 'create') {
                    dispatch(addPurchaseAction(values));
                } else if(modalState === 'edit') {
                    const id = state.purchases.find(purchase => purchase.isEdited)?.id;
                    if(id) {
                        dispatch(editPurchaseAction(id, values));
                    }
                }
            },
        }
    }
)(ModalForm);