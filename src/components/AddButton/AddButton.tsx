import {Button, ButtonProps, Divider} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React from "react";

export const AddButton: React.FC<ButtonProps> = (props) => {
    return (
        <>
            <Divider style={{margin: '4px 0'}}/>
            <Button type="link" icon={<PlusOutlined/>} style={{width: '100%'}} onClick={props.onClick}>
                {props.children}
            </Button>
        </>
    )
}