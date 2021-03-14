import {connect} from "react-redux";
import AddingSelect from "../conponents/AddingSelect/AddingSelect";
import {RootStore} from "../reducers/root/types";
import {clearArray} from "../helpers/app";

export default connect(
    (state: RootStore) => ({
        items: clearArray(state.purchases.map(purchase => purchase.whereBuy))
    })
)(AddingSelect)