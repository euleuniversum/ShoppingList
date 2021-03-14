import React from 'react';
import {Select, Divider, Button, message, SelectProps} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Props extends SelectProps<string> {
    addButtonText: string,
    items: string[],
    dispatch: any,
}

interface State {
    inputValue: string,
    newItem: string,
}

interface AddButtonProps {
    menu:  React.ReactElement,
    text: string,
    onClick: () => void
}
const AddButton = ({ menu, text, onClick }: AddButtonProps) => {
    return (
        <>
            <Divider style={{ margin: '4px 0' }} />
            <Button type="link" icon={<PlusOutlined />} style={{width: '100%'}} onClick={onClick}>
                {text}
            </Button>
        </>
    )
}

class AddingSelect extends React.Component<Props, State> {
    state = {
        inputValue: '',
        newItem: '',
    };

    onInputChange = (value: string) => {
        this.setState({
            inputValue: value,
        });
    };

    addItem = () => {
        const { inputValue } = this.state;
        if(inputValue) {
            this.setState({
                inputValue: '',
                newItem: inputValue,
            });
        } else {
            message.error('Сначала введите значение в поле');
        }
    };

    render() {
        const { addButtonText, items, dispatch, ...selectProps} = this.props;
        const { newItem } = this.state;

        return (
            <Select
                {...selectProps}
                optionFilterProp="children"
                showSearch
                getPopupContainer={trigger => trigger.parentNode}
                onSearch={this.onInputChange}
                filterOption={(input, option) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <AddButton
                            text={addButtonText}
                            onClick={this.addItem}
                            menu={menu}
                        />
                    </div>
                )} >
                {[newItem, ...items].filter(Boolean).map(item => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
        );
    }
}

export default AddingSelect;