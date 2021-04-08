import {Button, Divider, Select} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";
import {AddButtonProps} from "../../interface";

export const AddButton = ({menu, text, onClick}: AddButtonProps) => {
    return (
        <>
            <Divider style={{margin: '4px 0'}}/>
            <Button type="link" icon={<PlusOutlined/>} style={{width: '100%'}} onClick={onClick}>
                {text}
            </Button>
        </>
    )
}