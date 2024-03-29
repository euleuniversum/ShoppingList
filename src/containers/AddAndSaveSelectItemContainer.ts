import {connect} from "react-redux";
import AddAndSaveSelectItem from "../components/AddAndSaveSelectItem/AddAndSaveSelectItem";
import {clearArray} from "../helpers/app";
import {IRootStore} from "../interface";

export default connect(
    (state: IRootStore) => ({
        items: clearArray(Object.values(state.purchases.purchasesById).map(purchase => purchase.whereBuy))
    })
)(AddAndSaveSelectItem)