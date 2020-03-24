import { Menu, Button } from 'antd';
import React from 'react'
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  FlagOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import RONA from '../Assets/RONA.png'

const { SubMenu } = Menu;

export default class extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onClick = ({key}) => 
    this.props.history.push(`${key}`)


  render() {
    return (
      <div style={{ width: '20vw', position: 'absolute', float: 'left' , zIndex: 1}}>
          <img src={RONA} width='50%'
           onClick={this.toggleCollapsed}
           style={{ marginBottom: 16 }}
          />
        <Menu
          defaultSelectedKeys={['1']}
          //defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          onClick={this.onClick}
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="/">
            <GlobalOutlined />
            <span>World Chart</span>
          </Menu.Item>
          <Menu.Item key="/states">
            <FlagOutlined />
            <span>United States</span>
          </Menu.Item>

        </Menu>
      </div>
    );
  }
}