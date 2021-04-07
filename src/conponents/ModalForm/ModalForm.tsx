import {Button, Form, FormInstance, Input, InputNumber, Modal, Select} from "antd";
import React from "react";
import AddingSelectContainer from "../../containers/AddingSelectContainer";
import {IFormValues, IModalFormProps, IModalFormState} from "../../interface";
import {getPriceUnit, QuantityUnit, Unit} from "../../units";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {Option} = Select;

class ModalForm extends React.Component<IModalFormProps, IModalFormState> {

    private form = React.createRef<FormInstance>();

    constructor(props: IModalFormProps) {
        super(props);
        this.state = {
            priceUnit: props.initialValues?.priceUnit || Unit.ALL,
            quantityUnit: props.initialValues?.quantityUnit || Unit.PIECE
        };
    }

    componentDidUpdate(prevProps: Readonly<IModalFormProps>, prevState: Readonly<IModalFormState>, snapshot?: any) {
        if (prevProps !== this.props) {
            this.form.current?.resetFields();
            this.setState({
                priceUnit: this.props.initialValues?.priceUnit || Unit.ALL,
                quantityUnit: this.props.initialValues?.quantityUnit || Unit.PIECE
            });
        }
    }

    onOk = () => {
        this.form.current?.submit();
        console.log(this.form.current);
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

    onQuantityUnitChange = (value: Unit) => {
        this.setState({quantityUnit: value});
    }

    onPriceUnitChange = (value: Unit) => {
        this.setState({priceUnit: value});
    }

    getUnitOptions(units: Unit[]) {
        let options: JSX.Element[] = [];
        units.map(unit => {
            options.push(<Option key={unit} value={unit}>{unit}</Option>)
        });
        return options;
    }

    getPriceUnitOptions(quantityUnit: Unit) {
        const priceUnit = getPriceUnit(quantityUnit);
        return this.getUnitOptions(priceUnit);
    }

    render() {
        const {title, visible, initialValues} = this.props;
        const {quantityUnit } = this.state;
        return (
            <Modal title={title} visible={visible} onOk={this.onOk} onCancel={this.handleClose}>
                <Form
                    ref={this.form}
                    labelCol={{span: 6}}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label="Название"
                        name={'title'}
                        rules={[{required: true, message: 'Введите название покупки'}]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Количество">
                        <Form.Item name={'quantity'} noStyle>
                            <InputNumber min={0} style={{width: '65%'}}/>
                        </Form.Item>
                        <Form.Item name={'quantityUnit'} noStyle>
                            <Select
                                style={{width: '35%', top: '-1px'}}
                                onChange={this.onQuantityUnitChange}
                            >
                                {this.getUnitOptions(QuantityUnit)}
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Примерная цена">
                        <Form.Item name={'price'} noStyle>
                            <InputNumber min={0} style={{width: '65%'}}/>
                        </Form.Item>
                        <Form.Item name={'priceUnit'} noStyle>
                            <Select
                                style={{width: '35%'}}
                                onChange={this.onPriceUnitChange}
                            >
                                {this.getPriceUnitOptions(quantityUnit)}
                            </Select>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Где купить" name={'whereBuy'}>
                        <AddingSelectContainer
                            style={{width: '100%'}}
                            placeholder="Выберите место"
                            addButtonText={'Добавить место'}
                        />
                    </Form.Item>

                    <Form.List name={'replacements'}>
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <div key={key}>
                                        <MinusCircleOutlined onClick={() => remove(name)}/>
                                        <Form.Item
                                            {...restField}
                                            label="Название"
                                            name={'title'}
                                            fieldKey={[fieldKey, 'title']}
                                            rules={[{required: true, message: 'Введите название покупки'}]}>
                                            <Input/>
                                        </Form.Item>

                                        <Form.Item label="Количество">
                                            <Form.Item
                                                {...restField}
                                                name={'quantity'}
                                                fieldKey={[fieldKey, 'quantity']}
                                                noStyle>
                                                <InputNumber min={0} style={{width: '65%'}}/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={'quantityUnit'}
                                                fieldKey={[fieldKey, 'quantityUnit']}
                                                noStyle>
                                                <Select
                                                    style={{width: '35%', top: '-1px'}}
                                                    onChange={this.onQuantityUnitChange}
                                                >
                                                    {this.getUnitOptions(QuantityUnit)}
                                                </Select>
                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item label="Примерная цена">
                                            <Form.Item
                                                {...restField}
                                                name={'price'}
                                                fieldKey={[fieldKey, 'price']}
                                                noStyle>
                                                <InputNumber min={0} style={{width: '65%'}}/>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={'priceUnit'}
                                                fieldKey={[fieldKey, 'priceUnit']}
                                                noStyle>
                                                <Select
                                                    style={{width: '35%'}}
                                                    onChange={this.onPriceUnitChange}
                                                >
                                                    {this.getPriceUnitOptions(quantityUnit)}
                                                </Select>
                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            label="Где купить"
                                            fieldKey={[fieldKey, 'whereBuy']}
                                            name={'whereBuy'}>
                                            <AddingSelectContainer
                                                style={{width: '100%'}}
                                                placeholder="Выберите место"
                                                addButtonText={'Добавить место'}
                                            />
                                        </Form.Item>

                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                        Добавить замену
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        )
    }
}

export default ModalForm;