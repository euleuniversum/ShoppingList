import {connect} from "react-redux";
import { ShoppingTable } from "../conponents/ShoppingTable/ShoppingTable";
import {RootStore} from "../reducers/root/types";
import {changeModalState, deletePurchaseAction} from "../actionCreators";

export default connect(
    (state: RootStore) => ({
        purchases: state.purchases
    }),
    (dispatch) => ({
        onEditItem: (id: string) => dispatch(changeModalState('edit', id)),
        onDeleteItem: (id: string) => dispatch(deletePurchaseAction(id))
    })
)(ShoppingTable);