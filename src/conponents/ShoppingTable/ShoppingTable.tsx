import { Table } from 'antd';
import {getColumns} from "./columns";
import { clearArray } from '../../helpers/app';
import {IShoppingTableProps, IShoppingTableRow} from "../../interface";
import {useMemo} from "react";

export const ShoppingTable = ({ purchases, onEditItem, onDeleteItem }: IShoppingTableProps) => {
    const columns = useMemo(() =>
        getColumns(clearArray(purchases.map(purchase => purchase.whereBuy)), onEditItem, onDeleteItem),
    [purchases, onEditItem, onDeleteItem ]);


    const data: IShoppingTableRow[] = purchases.map((purchase) => {
        const quantityStr = purchase.quantity ? `${purchase.quantity} ${purchase.quantityUnit}` : '';
        const priceStr = purchase.price ? `${purchase.price} ${purchase.priceUnit}` : '';
        return {
            key: purchase.id,
            ...purchase,
            quantity: quantityStr,
            price: priceStr,
        }

    });

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={false}/>
    );
}