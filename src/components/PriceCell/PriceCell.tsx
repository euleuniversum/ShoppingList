import React from "react";
import {IPriceCellProps} from "../../interface";
import {Space, Typography} from "antd";
import { convertUnits, getTotalPriceElement } from "../../units";

const {Text} = Typography;

const PriceCell = ({purchase}: IPriceCellProps) => {
    const {priceUnit} = purchase;
    const price = purchase.price || 0;

    return (
        <Space>
            <Text>{getTotalPriceElement(purchase)}р</Text>
            <Text type="secondary">({`${price} р/${priceUnit}`})</Text>
        </Space>
    )
};

export default PriceCell;