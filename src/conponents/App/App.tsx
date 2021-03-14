import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../../store';
import {Layout, Card, Col, Row, Button} from 'antd';
import 'antd/dist/antd.css';
import styles from './App.module.css';
import { calcCenteredGrid } from '../../helpers/app';
import ModalFormContainer from "../../containers/ModalFormContainer";
import {changeModalState} from "../../actionCreators";
import ShoppingTableContainer from '../../containers/ShoppingTableContainer';
import moment from "moment";
import 'moment/locale/ru';

const { Header, Content } = Layout;

const grid = {
  xxl: calcCenteredGrid(20),
  ...calcCenteredGrid(24),
}

moment.locale('ru');

const App = () => {
  const onCreate = () => {
      store.dispatch(changeModalState('create'));
  }

  return (
      <Provider store={store}>
        <Layout className={styles.app}>
          <Header>
            <Row>
              <Col {...grid}>
                <Button type={'primary'} onClick={onCreate}>Добавить элемент</Button>
              </Col>
            </Row>
          </Header>
          <Content className={styles.content}>
            <Row>
              <Col {...grid}>
                <Card>
                  <ShoppingTableContainer />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
        <ModalFormContainer />
      </Provider>
  );
}

export default App;
