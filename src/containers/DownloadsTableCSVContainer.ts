import {connect} from "react-redux";
import {DownloadCSV} from "../components/DownloadCSV/DownloadCSV";
import {IPurchaseItem, IRootStore, ListNames} from "../interface";

function getHeaders() {
    return [
        { label: "Название", key: "title" },
        { label: "Замена для", key: "replacementFor" },
        { label: "Количество", key: "quantity" },
        { label: "Единица измерения", key: "quantityUnit" },
        { label: "Примерная цена", key: "price" },
        { label: "Единица измерения цены", key: "priceUnit" },
        { label: "Где купить", key: "whereBuy" },
    ];
}

function getData(sortedIds: string[], purchasesById: { [id: string]: IPurchaseItem }) {
    const data: IPurchaseItem[] = [];
    sortedIds.forEach(id => {
        const purchase = {
            ...purchasesById[id]
        };
        if (purchase.replacementFor) {
            purchase.replacementFor = purchasesById[purchase.replacementFor]?.title;
        }
        if (purchase.listName === ListNames.SHOPPING)
            data.push(purchase)
    });

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