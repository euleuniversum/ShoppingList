import {connect} from "react-redux";
import {DownloadCSV} from "../components/DownloadCSV/DownloadCSV";
import {IFormValues, IPurchaseItem, IRootStore} from "../interface";

function getHeaders() {
    return [
        { label: "Название", key: "title" },
        { label: "Количество", key: "quantity" },
        { label: "Единица измерения", key: "quantityUnit" },
        { label: "Примерная цена", key: "price" },
        { label: "Единица измерения цены", key: "priceUnit" },
        { label: "Где купить", key: "whereBuy" },
        //{ label: "Список замен", key: "replacementFor" },
    ];
}

function getData(sortedIds: string[], purchasesById: { [id: string]: IPurchaseItem }) {
    const data: IFormValues[] = [];
    for (const id of sortedIds) {
        data.push(purchasesById[id]);
    }
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