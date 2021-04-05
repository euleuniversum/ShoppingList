import {Table} from 'antd';
import styles from './ShoppingTable.module.css';
import {getColumns} from "./columns";
import {clearArray} from '../../helpers/app';
import {IShoppingTableProps, IShoppingTableRow} from "../../interface";
import {useMemo} from "react";
import {getTotalPriceElement} from "../../units";

export const ShoppingTable = ({purchases, onEditItem, onDeleteItem}: IShoppingTableProps) => {
    const columns = useMemo(() =>
            getColumns(clearArray(purchases.map(purchase => purchase.whereBuy)), onEditItem, onDeleteItem),
        [purchases, onEditItem, onDeleteItem]);

    const data: IShoppingTableRow[] = purchases.map((purchase) => {
        return {
            key: purchase.id,
            ...purchase,
        }
    });

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table
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
                            <Table.Summary.Cell className={styles.tfoot_td} index={2} colSpan={4}>
                                {totalPrice}р
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                );
            }}
        />
    );
}
