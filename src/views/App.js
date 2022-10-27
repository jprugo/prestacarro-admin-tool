import { React, useState } from 'react';

import { Layout, Menu } from 'antd';

import Actives from './Actives';
import Persons from './Persons';
import Report1 from './Report1';

import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

function App() {

  const [collapsed, setCollapsed] = useState(false);

  const [content, setContent] = useState();

  const onCollapse = collapsed => {
    console.log(collapsed);
    setCollapsed(collapsed);
  };

  const onMenuItemClick = (e) => {
    switch (e.key) {
      case '1':
        //activos
        setContent(<Actives></Actives>);
        break;
      case '2':
        //personas
        setContent(<Persons></Persons>);
        break;
      case '3':
        setContent(<Report1></Report1>);
        break;
      default:
        break;
    }
    console.log(e);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={onMenuItemClick}>
          <SubMenu key="sub2" icon={<PieChartOutlined />} title="Reportes" on>
            <Menu.Item key="3">Reporte 1</Menu.Item>
          </SubMenu>
          <Menu.Item key="1" icon={<DesktopOutlined />}>
            Activos
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Personas
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {content}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
