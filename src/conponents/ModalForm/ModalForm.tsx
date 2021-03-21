import {Form, FormInstance, Input, InputNumber, Modal, Select} from "antd";
import React from "react";
import AddingSelectContainer from "../../containers/AddingSelectContainer";
import {IFormValues, IModalFormProps, IModalFormState, Unit} from "../../interface";

const widthFull = {width: '100%'};
const {Option} = Select;

class ModalForm extends React.Component<IModalFormProps, IModalFormState> {

    private form = React.createRef<FormInstance>();

    constructor(props: IModalFormProps) {
        super(props);
        this.state = {
            unit: props.initialValues?.unit || Unit.ALL
        };
    }

    componentDidUpdate(prevProps: Readonly<IModalFormProps>, prevState: Readonly<IModalFormState>, snapshot?: any) {
        console.log(prevProps, this.props, prevProps === this.props);
        if (prevProps !== this.props) {
            this.form.current?.resetFields();
            this.setState({unit: this.props.initialValues?.unit || Unit.ALL});
        }
    }

    onOk = () => {
        this.form.current?.submit();
    };

    onFinish = (values: IFormValues) => {
        this.props.onSubmit(values);
        console.log(values);
        this.handleClose();
    };

    handleClose = () => {
        this.form.current?.resetFields();
        this.props.onClose();
    }

    onUnitChange = (value: Unit) => {
        this.setState({unit: value});
    }

    render() {
        const {title, visible, initialValues} = this.props;
        const {unit} = this.state;
        return (
            <Modal title={title} visible={visible} onOk={this.onOk} onCancel={this.handleClose}>
                <Form
                    ref={this.form}
                    labelCol={{span: 6}}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={initialValues}>
                    <Form.Item
                        label="Название"
                        name={'title'}
                        rules={[{required: true, message: 'Введите название покупки'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Количество" >
                        <Form.Item  name={'quantity'} noStyle>
                            <InputNumber style={{width: '65%'}} />
                        </Form.Item>
                        <Form.Item  name={'unit'} noStyle>
                            <Select
                                style={{width: '35%', top: '-1px'}}
                                onChange={this.onUnitChange}
                            >
                                <Option value={Unit.PIECES}>{Unit.PIECES}</Option>
                                <Option value={Unit.KILOGRAM}>{Unit.KILOGRAM}</Option>
                                <Option value={Unit.GRAM}>{Unit.GRAM}</Option>
                                <Option value={Unit.METER}>{Unit.METER}</Option>
                                <Option value={Unit.LITER}>{Unit.LITER}</Option>
                                <Option value={Unit.ALL}>{Unit.ALL}</Option>
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Примерная цена" >
                        <Form.Item  name={'price'} noStyle>
                            <InputNumber style={{width: '65%'}}/>
                        </Form.Item>
                            <div style={{width: '35%', top: '-1px'}}>{unit}</div>
                    </Form.Item>

                    <Form.Item label="Где купить" name={'whereBuy'}>
                        <AddingSelectContainer
                            style={widthFull}
                            placeholder="Выберите место"
                            addButtonText={'Добавить место'}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default ModalForm;