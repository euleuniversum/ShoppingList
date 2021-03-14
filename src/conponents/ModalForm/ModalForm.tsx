import {Form, FormInstance, Input, InputNumber, Modal} from "antd";
import React from "react";
import {FormValuesType} from "../../reducers/purchases/types";
import AddingSelectContainer from "../../containers/AddingSelectContainer";

interface Props {
    title?: string,
    visible?: boolean,
    onClose: () => void,
    onSubmit: (values: FormValuesType) => void,
    initialValues?: FormValuesType
}

interface State {}

class ModalForm extends React.Component<Props, State> {

    private form = React.createRef<FormInstance>();

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
        this.form.current?.resetFields();
    }

    onOk = () => {
        this.form.current?.submit();
    };

    onFinish = (values: FormValuesType) => {
        this.props.onSubmit(values);

        this.handleClose();
    };

    handleClose = () => {
        this.form.current?.resetFields();
        this.props.onClose();
    }

    render() {
        const { title, visible, initialValues } = this.props;
        return (
            <Modal title={title} visible={visible} onOk={this.onOk} onCancel={this.handleClose}>
                <Form
                    ref={this.form}
                    labelCol={{ span: 6 }}
                    layout="horizontal"
                    onFinish={this.onFinish}
                    initialValues={initialValues}>
                    <Form.Item
                        label="Название"
                        name={'title'}
                        rules={[{ required: true, message: 'Введите название покупки' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Количество" name={'quantity'}>
                        <InputNumber style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item label="Примерная цена" name={'price'}>
                        <InputNumber style={{ width: '100%' }}/>
                    </Form.Item>

                    <Form.Item label="Где купить" name={'whereBuy'}>
                        <AddingSelectContainer
                            style={{ width: '100%' }}
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