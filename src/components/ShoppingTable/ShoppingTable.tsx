import {Table} from 'antd';
import styles from './ShoppingTable.module.css';
import {getColumns} from "./columns";
import {clearArray} from '../../helpers/app';
import {IShoppingTableProps, IShoppingTableRow} from "../../interface";
import {useMemo} from "react";
import {getTotalPriceElement} from "../../units";

export const ShoppingTable = ({purchases, onAddReplacement, onEditItem, onDeleteItem, onSortItem, onChangePurchased}: IShoppingTableProps) => {
    const columns = useMemo(() =>
            getColumns(
                clearArray(
                    purchases
                        .filter(purchase => !purchase.replacementFor)
                        .map(purchase => purchase.whereBuy)
                ),
                onAddReplacement,
                onEditItem,
                onDeleteItem,
            ),
        [purchases, onEditItem, onDeleteItem, onAddReplacement]);

    const data: IShoppingTableRow[] = purchases
        .filter(purchase => !purchase.replacementFor)
        .map((purchase) => {
            const purchaseObject: IShoppingTableRow = {key: purchase.id, ...purchase};
            const childrenList = purchases
                .filter(item => item.replacementFor === purchase.id)
                .map(item => ({key: item.id, ...item}));

            if (childrenList.length > 0) purchaseObject.children = childrenList;

            return purchaseObject;
        });

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        const currentData: IShoppingTableRow[] = extra.currentDataSource;
        let currentIds: string[] = [];

        for (const purchase of currentData) {
            currentIds.push(purchase.key)
            purchase.children?.forEach(replacement => currentIds.push(replacement.key));
        }

        onSortItem(currentIds);

        console.log('params', pagination, filters, sorter, extra);
    }

    const rowSelection = {
        checkStrictly: false,
        onSelect: (record: IShoppingTableRow, selected: boolean, selectedRows: IShoppingTableRow[], nativeEvent: any) => {
            let idsForChanges = [record.key];
            record.children?.forEach((purchases) => idsForChanges.push(purchases.key));

            onChangePurchased(idsForChanges, selected);
            console.log(record, selected, selectedRows);
        },

        onSelectAll: (selected: boolean, selectedRows: IShoppingTableRow[], changeRows: IShoppingTableRow[]) => {
            let idsForChanges = [];
            for (const row of changeRows) {
                idsForChanges.push(row.key);
                row.children?.forEach((child) => idsForChanges.push(child.key));
            }
            onChangePurchased(idsForChanges, selected);
            console.log(selected, selectedRows, changeRows);
        }
    };

    return (
        <Table
            rowSelection={{
                ...rowSelection
            }}
            columns={columns}
            dataSource={data}
            onChange={onChange}
            pagination={false}
            summary={pageData => {
                let totalPrice = 0;
                pageData.forEach((purchase) => {
                    totalPrice += getTotalPriceElement(purchase);
                });

                return (
                    <>
                        <Table.Summary.Row className={styles.tfoot_th}>
                            <Table.Summary.Cell className={styles.tfoot_td} index={1} colSpan={2}>Итого:</Table.Summary.Cell>
                            <Table.Summary.Cell className={styles.tfoot_td} index={2} colSpan={5}>
                                {totalPrice}р
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        />
    );
}
