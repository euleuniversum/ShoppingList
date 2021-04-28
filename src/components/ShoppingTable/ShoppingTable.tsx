import {Table, Tabs} from 'antd';
import styles from './ShoppingTable.module.css';
import {getColumns} from "./columns";
import {clearArray} from '../../helpers/app';
import {IPurchaseItem, IShoppingTableProps, IShoppingTableRow, ListNames} from "../../interface";
import React, {useMemo} from "react";
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

    const columnsSL = useMemo(() =>
            getColumns(
                clearArray(
                    shoppingList
                        .filter(purchase => !purchase.replacementFor)
                        .map(purchase => purchase.whereBuy)
                ),
                onAddReplacement,
                onEditItem,
                onDeleteItem,
            ),
        [shoppingList, onEditItem, onDeleteItem, onAddReplacement]);

    const columnsPL = useMemo(() =>
            getColumns(
                clearArray(
                    purchasedList
                        .filter(purchase => !purchase.replacementFor)
                        .map(purchase => purchase.whereBuy)
                ),
                onAddReplacement,
                onEditItem,
                onDeleteItem,
            ),
        [purchasedList, onEditItem, onDeleteItem, onAddReplacement]);


    const getDataList = (purchases: IPurchaseItem[]): IShoppingTableRow[] => {
        const getChildrenList = (purchase: IPurchaseItem) => {
            return purchases
                .filter(item => item.replacementFor === purchase.id)
                .map(item => ({key: item.id, ...item}));
        }

        const purchasesFiltered = purchases.filter(purchase => !purchase.replacementFor);

        const purchaseList = purchasesFiltered.map((purchase) => {
            const purchaseObject: IShoppingTableRow = {key: purchase.id, ...purchase};

            const childrenList = getChildrenList(purchase);
            if (childrenList.length > 0) purchaseObject.children = childrenList;

            return purchaseObject;
        });
        console.log('getDataList', purchaseList);
        return purchaseList;
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

    const getRowSelection = (to: ListNames) => {
        return {
            checkStrictly: false,
            columnWidth: '30px',
            onChange: (selectedRowKeys: any, selectedRows: IShoppingTableRow[]) => {
                onChangeListName(selectedRowKeys, to);
                console.log(selectedRowKeys, selectedRows);
            }
        }
    };

    return (
        <Tabs type="card">
            <TabPane tab="Список покупок" key="1">
                <Table
                    rowSelection={{
                        ...getRowSelection(ListNames.PURCHASED)
                    }}
                    columns={columnsSL}
                    dataSource={getDataList(shoppingList)}
                    onChange={onChange}
                    pagination={false}
                    scroll={{x: 1000}} sticky
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
                                    <Table.Summary.Cell className={styles.tfoot_td} index={2} colSpan={5}>
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
                    rowSelection={{
                        ...getRowSelection(ListNames.SHOPPING)
                    }}
                    columns={columnsPL}
                    dataSource={getDataList(purchasedList)}
                    onChange={onChange}
                    pagination={false}
                    scroll={{x: 1000}} sticky
                />
            </TabPane>
        </Tabs>
    );
}
