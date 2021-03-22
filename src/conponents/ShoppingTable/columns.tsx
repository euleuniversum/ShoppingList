import {ColumnsType} from "antd/lib/table/interface";
import {IShoppingTableRow} from "../../interface";
import {DateValue} from "../DateValue/DateValue";
import {ElementActions} from "../ElementActions/ElementActions";
import PriceCell from "../PriceCell/PriceCell";
import {getTotalPriceElement} from "../../units";

const setDataIndex = (value: keyof IShoppingTableRow): keyof IShoppingTableRow => value;

export function getColumns(filterValues: string[],
                           onEdit: (id: string) => void,
                           onDelete: (id: string) => void): ColumnsType<IShoppingTableRow> {
    return [
        {
            title: 'Название',
            dataIndex: setDataIndex('title'),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => b.title.localeCompare(a.title),
        },
        {
            title: 'Количество',
            dataIndex: setDataIndex('quantity'),
            render: (quantity, purchase) => `${quantity || 0} ${purchase.quantityUnit}`,
        },
        {
            title: 'Примерная цена',
            dataIndex: setDataIndex('price'),
            sortDirections: ['descend', 'ascend'],
            render: (price, purchase) => <PriceCell purchase={purchase}/>,
            sorter: (a, b) => (
                getTotalPriceElement(a) - getTotalPriceElement(b)
            ),
        },
        {
            title: 'Где купить',
            dataIndex: setDataIndex('whereBuy'),
            filters: filterValues.map(item => ({
                text: item,
                value: item
            })),
            onFilter: (value, purchase) => (
                purchase.whereBuy?.indexOf(value as string) === 0
            ),
        },
        {
            title: 'Дата добавления',
            dataIndex: setDataIndex('creationDate'),
            render: date => <DateValue date={date}/>,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => (
                a.creationDate > b.creationDate ? 1 : -1
            ),
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (text, purchase) => (
                <ElementActions
                    id={purchase.key}
                    title={purchase.title}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        }
    ];
}