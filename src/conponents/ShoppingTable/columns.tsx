import {ColumnsType} from "antd/lib/table/interface";
import {IShoppingTableRow} from "../../interface";
import {DateValue} from "../DateValue/DateValue";
import {ElementActions} from "../ElementActions/ElementActions";

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
        },
        {
            title: 'Примерная цена',
            dataIndex: setDataIndex('price'),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => {
                const aPrice = (a.price && typeof a.price === 'string') ? parseInt(a.price) : 0;
                const bPrice = (b.price && typeof b.price === 'string') ? parseInt(b.price) : 0;
                return aPrice - bPrice;
            },
        },
        // {
        //     title: 'Итого',
        //     dataIndex: setDataIndex('total'),
        //     sortDirections: ['descend', 'ascend'],
        //     sorter: (a, b) => {
        //         const aTotal = a.total || 0;
        //         const bTotal = b.total || 0;
        //         return aTotal - bTotal;
        //     },
        // },
        {
            title: 'Где купить',
            dataIndex: setDataIndex('whereBuy'),
            filters: filterValues.map(item => ({
                text: item,
                value: item
            })),
            onFilter: (value, record) => record.whereBuy?.indexOf(value as string) === 0,
        },
        {
            title: 'Дата добавления',
            dataIndex: setDataIndex('creationDate'),
            render: date => <DateValue date={date}/>,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.creationDate > b.creationDate ? 1 : -1,
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            render: (text, record) => (
                <ElementActions
                    id={record.key}
                    title={record.title}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ),
        }
    ];
}