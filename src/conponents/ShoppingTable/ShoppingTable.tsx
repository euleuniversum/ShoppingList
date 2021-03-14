import { Table } from 'antd';
import {getColumns} from "./columns";
import {PurchaseType, TableRowType} from "../../reducers/purchases/types";
import { clearArray } from '../../helpers/app';

interface Props {
    purchases: PurchaseType[],
    onEditItem: (id: string) => void,
    onDeleteItem: (id: string) => void,
}

export const ShoppingTable = ({ purchases, onEditItem, onDeleteItem }: Props) => {
    const columns = getColumns(
        clearArray(purchases.map(purchase => purchase.whereBuy)),
        onEditItem,
        onDeleteItem
    );
    const data: TableRowType[] = purchases.map(purchase => ({
        key: purchase.id,
        ...purchase
    }));

    const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <Table columns={columns} dataSource={data} onChange={onChange} pagination={false}/>
    );
}