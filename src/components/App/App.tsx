import React from 'react';
import {Provider} from 'react-redux'
import {Button, Card, Col, Layout, Row} from 'antd';
import 'antd/dist/antd.css';
import moment from "moment";
import 'moment/locale/ru';
import styles from './App.module.css';
import {calcCenteredGrid} from '../../helpers/app';
import {changeModalState} from "../../actionCreators";
import ModalFormContainer from "../../containers/ModalFormContainer";
import ShoppingTableContainer from '../../containers/ShoppingTableContainer';
import DownloadsTableCSVContainer from '../../containers/DownloadsTableCSVContainer';
import {store} from '../../store';
import {ModalState} from "../../interface";

const {Header, Content} = Layout;

const grid = {
    xxl: calcCenteredGrid(20),
    ...calcCenteredGrid(24),
}

const spanForHeaderRow = {
    xs: {flex: "auto", offset: 1},
    sm: {flex: "auto", offset: 1},

}

moment.locale('ru');

const App = () => {
    const onCreate = () => {
        store.dispatch(changeModalState(ModalState.CREATE));
    }

    return (
        <Provider store={store}>
            <Layout className={styles.app}>
                <Header>
                    <Row>
                        <Col {...spanForHeaderRow}>
                            <Button type={'primary'} onClick={onCreate}>Добавить элемент</Button>
                        </Col>
                        <Col {...spanForHeaderRow}>
                            <DownloadsTableCSVContainer/>
                        </Col>
                    </Row>
                </Header>
                <Content className={styles.content}>
                    <Row>
                        <Col {...grid}>
                            <Card>
                                <ShoppingTableContainer/>
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <ModalFormContainer/>
        </Provider>
    );
}

export default App;
