import {connect} from "react-redux";
import {ShoppingTable} from "../components/ShoppingTable/ShoppingTable";
import {changeListName, changeModalState, deletePurchaseAction, updateIdsInTableState} from "../actionCreators";
import {IRootStore, ListNames, ModalState} from "../interface";

export default connect(
    (state: IRootStore) => ({
        shoppingList: Object.values(state.purchases.purchasesById).filter((purchase) => purchase.listName === ListNames.SHOPPING),
        purchasedList: Object.values(state.purchases.purchasesById).filter((purchase) => purchase.listName === ListNames.PURCHASED)
    }),
    (dispatch) => ({
        onAddReplacement: (replacementFor: string) => dispatch(changeModalState(ModalState.CREATE, undefined, replacementFor)),
        onEditItem: (id: string) => dispatch(changeModalState(ModalState.EDIT, id)),
        onDeleteItem: (id: string) => dispatch(deletePurchaseAction(id)),
        onSortItem: (ids: string[]) => dispatch(updateIdsInTableState(ids)),
        onChangeListName: (ids: string[], listName: ListNames) => dispatch(changeListName(ids, listName)),
    })
)(ShoppingTable);