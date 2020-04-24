/*
 * @Author: yu-lei
 * @Date: 2020-04-11 11:58:17
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-15 13:22:51
 */

import React from 'react';
import './index.css';
import { Space, Dropdown, Button, Menu, Avatar, Typography } from 'antd';
import Weather from './weather';
import { SettingOutlined, SkinOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import HeaderGroup from './headerGroup';
import ActionModal from './actionsettingModal';
import UsermessageModal from './usersettingModal';
import ThemeSetting from './themeSettingModal'
import {
  logout,
  initSetting,
  pushDatatoServer,
} from '../../store/action/actions';

function Header(props) {
  const { logout, initSetting, pushDatatoServer, ...user } = props;
  const { username, avater, loginStatus, _id } = user;
  function handleMenuClick(e) {}
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key='1'>
        <ActionModal />
      </Menu.Item>
      <Menu.Item key='2'>
        <UsermessageModal />
      </Menu.Item>
    </Menu>
  );
  const handlelogout = () => {
    console.log('logout');
    logout(_id);
  };
  if (loginStatus) {
    return (
      <>
        <div className='Header_logo'>
          <Space size={20}>
            <Avatar
              src={
                  avater ||
                'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              }
            />
            <Typography.Text strong className='username'>
              {username || ''}
            </Typography.Text>

            <Button onClick={handlelogout}>Sign Out</Button>

            <Dropdown overlay={menu}>
              <Button>
                Setting <SettingOutlined />
              </Button>
            </Dropdown>
            <ThemeSetting/>
          </Space>
        </div>
        <Weather />
      </>
    );
  } else {
    return (
      <>
        <div className='Header_logo'>
          <HeaderGroup />
        </div>
        <Weather />
      </>
    );
  }
}
const state = ({ user }) => {
  return {
    ...user,
  };
};
export default connect(state, {
  logout,
  initSetting,
  pushDatatoServer,
})(Header);
