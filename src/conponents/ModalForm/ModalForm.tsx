import {Form, FormInstance, Input, InputNumber, Modal} from "antd";
import React from "react";
import AddingSelectContainer from "../../containers/AddingSelectContainer";
import {IFormValues, IModalFormProps, IModalFormState} from "../../interface";

const widthFull = {width: '100%'};

class ModalForm extends React.Component<IModalFormProps, IModalFormState> {

    private form = React.createRef<FormInstance>();

    componentDidUpdate(prevProps: Readonly<IModalFormProps>, prevState: Readonly<IModalFormState>, snapshot?: any) {
        this.form.current?.resetFields();
    }

    onOk = () => {
        this.form.current?.submit();
    };

    onFinish = (values: IFormValues) => {
        this.props.onSubmit(values);

        this.handleClose();
    };

    handleClose = () => {
        this.form.current?.resetFields();
        this.props.onClose();
    }

    render() {
        const {title, visible, initialValues} = this.props;
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

                    <Form.Item label="Количество" name={'quantity'}>
                        <InputNumber style={widthFull}/>
                    </Form.Item>

                    <Form.Item label="Примерная цена" name={'price'}>
                        <InputNumber style={widthFull}/>
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