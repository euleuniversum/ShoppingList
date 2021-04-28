import {IElementActionsProps, ListNames} from "../../interface";
import ButtonGroup from "antd/lib/button/button-group";
import {Button, Popconfirm, Tooltip} from "antd";
import {CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined, SisternodeOutlined} from "@ant-design/icons";


export const ElementActions = ({
                                   id,
                                   childrenIds,
                                   toListName,
                                   title,
                                   onEdit,
                                   onDelete,
                                   onAddReplacement,
                                   showChangeListButton,
                                   showReplacementButton,
                                   onChangeListName
                               }: IElementActionsProps) => {

    const getChangeListButton = () => {
        const icon = toListName === ListNames.PURCHASED ? (<CheckOutlined/>) : (<CloseOutlined/>);
        const title = toListName === ListNames.PURCHASED ? 'Куплено' : 'Вернуть';

        return (
            <Tooltip placement="left" title={title}>
                <Button
                    icon={icon}
                    onClick={() => onChangeListName([id, ...childrenIds], toListName)}
                />
            </Tooltip>);
    }

    return (
        <ButtonGroup>
            {showChangeListButton ? getChangeListButton() : null}
            {showReplacementButton ? (
                <Tooltip placement="top" title={'Добавить заменитель'}>
                    <Button
                        icon={<SisternodeOutlined/>}
                        onClick={() => onAddReplacement(id)}
                    />
                </Tooltip>
            ) : null}
            <Tooltip placement="left" title={'Редактировать'}>
                <Button
                    icon={<EditOutlined/>}
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
                        danger
                        icon={<DeleteOutlined/>}
                    />
                </Popconfirm>
            </Tooltip>
        </ButtonGroup>
    );
}