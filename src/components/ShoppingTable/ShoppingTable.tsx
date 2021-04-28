import {Table, Tabs} from 'antd';
import styles from './ShoppingTable.module.css';
import {getColumns} from "./columns";
import {clearArray} from '../../helpers/app';
import {IPurchaseItem, IShoppingTableProps, IShoppingTableRow, ListNames} from "../../interface";
import React from "react";
import {getTotalPriceElement} from "../../units";

const {TabPane} = Tabs;

export const ShoppingTable = ({
                                  shoppingList,
                                  purchasedList,
                                  onAddReplacement,
                                  onEditItem,
                                  onDeleteItem,
                                  onSortItem,
                                  onChangeListName
                              }: IShoppingTableProps) => {

    const columnsShoppingList = getColumns(
                clearArray(
                    shoppingList
                        .filter(purchase => !purchase.replacementFor)
                        .map(purchase => purchase.whereBuy)
                ),
                ListNames.PURCHASED,
                onAddReplacement,
                onEditItem,
                onDeleteItem,
                onChangeListName,
            );

    const columnsPurchasedList = getColumns(
                clearArray(
                    purchasedList
                        .filter(purchase => !purchase.replacementFor)
                        .map(purchase => purchase.whereBuy)
                ),
                ListNames.SHOPPING,
                onAddReplacement,
                onEditItem,
                onDeleteItem,
                onChangeListName
            );

    const getDataList = (purchases: IPurchaseItem[]): IShoppingTableRow[] => {
        const getChildrenList = (purchase: IPurchaseItem) => {
            return purchases
                .filter(item => item.replacementFor === purchase.id)
                .map(item => ({key: item.id, ...item}));
        }

        const purchasesFiltered = purchases.filter(purchase => !purchase.replacementFor);

        return purchasesFiltered.map((purchase) => {
            const purchaseObject: IShoppingTableRow = {key: purchase.id, ...purchase};

            const childrenList = getChildrenList(purchase);
            if (childrenList.length > 0) purchaseObject.children = childrenList;

            return purchaseObject;
        });
    }

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        const currentData: IShoppingTableRow[] = extra.currentDataSource;
        let currentIds: string[] = [];

        for (const purchase of currentData) {
            currentIds.push(purchase.key)
            purchase.children?.forEach(replacement => currentIds.push(replacement.key));
        }
        onSortItem(currentIds);
    }

    return (
        <Tabs type="card">
            <TabPane tab="Список покупок" key="1">
                <Table
                    columns={columnsShoppingList}
                    dataSource={getDataList(shoppingList)}
                    onChange={onChange}
                    pagination={false}
                    scroll={{x: 1000}}
                    sticky
                    summary={pageData => {
                        let totalPrice = 0;
                        pageData.forEach((purchase) => {
                            totalPrice += getTotalPriceElement(purchase);
                        });

                        return (
                            <>
                                <Table.Summary.Row className={styles.tfoot_th}>
                                    <Table.Summary.Cell className={styles.tfoot_td} index={1}
                                                        colSpan={2}>Итого:</Table.Summary.Cell>
                                    <Table.Summary.Cell className={styles.tfoot_td} index={2} colSpan={4}>
                                        {totalPrice}р
                                    </Table.Summary.Cell>
                                </Table.Summary.Row>
                            </>
                        );
                    }}
                />
            </TabPane>
            <TabPane tab="Куплено" key="2">
                <Table
                    columns={columnsPurchasedList}
                    dataSource={getDataList(purchasedList)}
                    onChange={onChange}
                    pagination={false}
                    scroll={{x: 1000}}
                    sticky
                />
            </TabPane>
        </Tabs>
    );
}
