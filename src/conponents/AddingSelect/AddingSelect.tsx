import React from 'react';
import {Select, message} from 'antd';
import {IAddingSelectProps, IAddingSelectState} from "../../interface";
import {AddButton} from "../AddButton/AddButton";

const {Option} = Select;

class AddingSelect extends React.Component<IAddingSelectProps, IAddingSelectState> {
    constructor(props: IAddingSelectProps) {
        super(props);
        this.state = {
            inputValue: '',
            newItem: '',
        };
    }

    onInputChange = (value: string) => {
        this.setState({
            inputValue: value,
        });
    };

    addItem = () => {
        const {inputValue} = this.state;
        if (inputValue) {
            this.setState({
                inputValue: '',
                newItem: inputValue,
            });
        } else {
            message.error('Сначала введите значение в поле');
        }
    };

    render() {
        const {addButtonText, items, dispatch, ...selectProps} = this.props;
        const {newItem} = this.state;

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
                        {console.log(menu)}
                        {menu}
                        <AddButton
                            menu={menu}
                            text={addButtonText}
                            onClick={this.addItem}
                        />
                    </div>
                )}>
                {[newItem, ...items].filter(Boolean).map(item => (
                    <Option key={item} value={item}>{item}</Option>
                ))}
            </Select>
        );
    }
}

export default AddingSelect;