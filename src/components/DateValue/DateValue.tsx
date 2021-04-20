import {IDateValueProps} from "../../interface";
import {Tooltip} from "antd";
import moment from "moment";

export const DateValue = ({date}: IDateValueProps) => (
    <Tooltip
        placement="top"
        title={moment(date).format('DD.MM.YYYY HH:mm:ss')}
    >
        {moment(date).format('DD.MM.YYYY')}
    </Tooltip>
)