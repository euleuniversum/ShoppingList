import {ColumnsType} from "antd/lib/table/interface";
import { TableRowType } from "../../reducers/purchases/types";
import moment from "moment";
import {Button, Tooltip, Popconfirm} from "antd";
import ButtonGroup from "antd/lib/button/button-group";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";

const setDataIndex = (value: keyof TableRowType): keyof TableRowType => value;

interface DateValueProps {
    date: Date
}
const DateValue = ({date}: DateValueProps) => (
    <Tooltip placement="top" title={moment(date).format('DD.MM.YYYY HH:mm:ss')}>
        {moment(date).format('DD.MM.YYYY')}
    </Tooltip>
)

interface ActionsProps {
    id: string,
    title: string,
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
}
const Actions = ({ id, title, onEdit, onDelete}: ActionsProps) => (
    <ButtonGroup>
        <Tooltip placement="left" title={'Редактировать'}>
            <Button
                icon={<EditOutlined />}
                onClick={() => onEdit(id)}
            />
        </Tooltip>
        <Tooltip placement="right" title={'Удалить'}>
            <Popconfirm
                title={`Удалить ${title} из списка покупок?`}
                okText="Удалить"
                cancelText="Отмена"
                onConfirm={() => onDelete(id)}>
                <Button
                    danger={true}
                    icon={<DeleteOutlined />}
                />
            </Popconfirm>
        </Tooltip>
    </ButtonGroup>
)

export const getColumns = (
    filterValues: string[],
    onEdit: (id: string) => void,
    onDelete: (id: string) => void
): ColumnsType<TableRowType> => [
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
            const aPrice = a.price || 0;
            const bPrice = b.price || 0;
            return aPrice - bPrice;
        },
    },
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
        render: date => <DateValue date={date} />,
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a.creationDate > b.creationDate ? 1 : -1,
    },
    {
        title: 'Действия',
        dataIndex: 'actions',
        render: (text, record) => (
            <Actions
                id={record.key}
                title={record.title}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        ),
    }
];