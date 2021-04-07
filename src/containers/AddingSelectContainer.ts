import {connect} from "react-redux";
import AddingSelect from "../components/AddingSelect/AddingSelect";
import {clearArray} from "../helpers/app";
import {IRootStore} from "../interface";

export default connect(
    (state: IRootStore) => ({
        items: clearArray(state.purchases.map(purchase => purchase.whereBuy))
    })
)(AddingSelect)