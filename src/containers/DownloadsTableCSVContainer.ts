import {connect} from "react-redux";
import {DownloadCSV} from "../components/DownloadCSV/DownloadCSV";
import { IPurchaseItem, IRootStore} from "../interface";

function getHeaders() {
    return [
        { label: "ID", key: "id" },
        { label: "Замена для", key: "replacementFor" },
        { label: "Название", key: "title" },
        { label: "Количество", key: "quantity" },
        { label: "Единица измерения", key: "quantityUnit" },
        { label: "Примерная цена", key: "price" },
        { label: "Единица измерения цены", key: "priceUnit" },
        { label: "Где купить", key: "whereBuy" },
    ];
}

function getData(sortedIds: string[], purchasesById: { [id: string]: IPurchaseItem }) {
    const data: IPurchaseItem[] = [];
    sortedIds.forEach(id => data.push(purchasesById[id]));
    return data;
}

export default connect(
    (state: IRootStore) => ({
        headers: getHeaders(),
        data: getData(state.purchases.sortedPurchasesIds, state.purchases.purchasesById),
        text: "Скачать список",
        filename: "my-purchases.csv"
    })
)(DownloadCSV)