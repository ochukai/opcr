import React from 'react';

import { Layout, Menu, Row, Col, BackTop } from 'antd';
import { UserOutlined, HomeOutlined, HeatMapOutlined, ToolOutlined, CalculatorOutlined } from '@ant-design/icons';

import { Switch, Route, Link, withRouter, useLocation } from 'react-router-dom';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

import Index from './pages/index/index';
import NotFound from './pages/error/NotFound';
import Units from './pages/unit/Units';
import UnitDetail from './pages/unit/UnitDetail';
import Equipments from './pages/equip/Equipments';
import Quests from './pages/quest/Quests';

import EquipCalc from './pages/equipcalc/EquipCalc';

import './App.less';

function App() {
  const location = useLocation();
  console.log('app - use location', location);

  return (
    <Layout className="opcr-app-layout">
      <Header>
        <Row>
          <Col span={14} offset={5}>
            <Menu mode="horizontal">
              <Menu.Item key="index">
                <Link to="/"><HomeOutlined /></Link>
              </Menu.Item>
              <Menu.Item key="unit">
                <Link to="/units"><UserOutlined /> 人物</Link>
              </Menu.Item>
              <Menu.Item key="equip">
                <Link to="/equipments"><ToolOutlined /> 装备</Link>
              </Menu.Item>
              <Menu.Item key="quest">
                <Link to="/quests"><HeatMapOutlined /> 地图</Link>
              </Menu.Item>
              <Menu.Item key="ec">
                <Link to="/equipcalc"><CalculatorOutlined /> 计算器</Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>

      <Content className="opcr-main-content">
        <Row>
          <Col span={14} offset={5}>
            <Switch>
              <Route exact path="/" component={Index} />
              <Route exact path="/units" component={Units} />
              <Route exact path="/unit/:id" component={UnitDetail} />
              <Route exact path="/equipcalc" component={EquipCalc} />
              <Route exact path="/equipments" component={Equipments} />
              <Route exact path="/quests" component={Quests} />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Content>
      <BackTop />
    </Layout>
  );
}

export default withRouter(App);
