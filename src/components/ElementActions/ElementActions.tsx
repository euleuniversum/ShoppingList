import {IElementActionsProps} from "../../interface";
import ButtonGroup from "antd/lib/button/button-group";
import {Button, Popconfirm, Tooltip} from "antd";
import {DeleteOutlined, EditOutlined, SisternodeOutlined} from "@ant-design/icons";

export const ElementActions = ({id, title, onEdit, onDelete, onAddReplacement, showReplacementButton}: IElementActionsProps) => (
    <ButtonGroup>
        <Tooltip placement="left" title={'Редактировать'}>
            <Button
                icon={<EditOutlined/>}
                onClick={() => onEdit(id)}
            />
        </Tooltip>
        {showReplacementButton ? (
            <Tooltip placement="top" title={'Добавить заменитель'}>
                <Button
                    icon={<SisternodeOutlined />}
                    onClick={() => onAddReplacement(id)}
                />
            </Tooltip>
        ) : null}
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
)