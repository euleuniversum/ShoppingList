import {connect} from "react-redux";
import { ShoppingTable } from "../components/ShoppingTable/ShoppingTable";
import {changeModalState, deletePurchaseAction, updateIdsInTableState} from "../actionCreators";
import {IRootStore, ModalState} from "../interface";

export default connect(
    (state: IRootStore) => ({
        purchases: Object.values(state.purchases.purchasesById)
    }),
    (dispatch) => ({
        onAddReplacement: (replacementFor: string) => dispatch(changeModalState(ModalState.CREATE, undefined, replacementFor)),
        onEditItem: (id: string) => dispatch(changeModalState(ModalState.EDIT, id)),
        onDeleteItem: (id: string) => dispatch(deletePurchaseAction(id)),
        onSortItem: (ids: string[]) => dispatch(updateIdsInTableState(ids))
    })
)(ShoppingTable);