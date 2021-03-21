import {connect} from "react-redux";
import { ShoppingTable } from "../conponents/ShoppingTable/ShoppingTable";
import {changeModalState, deletePurchaseAction} from "../actionCreators";
import {IRootStore, ModalState} from "../interface";

export default connect(
    (state: IRootStore) => ({
        purchases: state.purchases
    }),
    (dispatch) => ({
        onEditItem: (id: string) => dispatch(changeModalState(ModalState.EDIT, id)),
        onDeleteItem: (id: string) => dispatch(deletePurchaseAction(id))
    })
)(ShoppingTable);