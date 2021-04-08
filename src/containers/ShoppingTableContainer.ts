import {connect} from "react-redux";
import { ShoppingTable } from "../components/ShoppingTable/ShoppingTable";
import {changeModalState, deletePurchaseAction} from "../actionCreators";
import {IRootStore, ModalState} from "../interface";

export default connect(
    (state: IRootStore) => ({
        purchases: state.purchases
    }),
    (dispatch) => ({
        onAddReplacement: (replacementFor: string) => dispatch(changeModalState(ModalState.CREATE, undefined, replacementFor)),
        onEditItem: (id: string) => dispatch(changeModalState(ModalState.EDIT, id)),
        onDeleteItem: (id: string) => dispatch(deletePurchaseAction(id))
    })
)(ShoppingTable);