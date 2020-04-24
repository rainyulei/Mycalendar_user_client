import React, { useState,useEffect } from 'react';
import { Button, Modal, Card } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import  {loadLayoutEdit} from '../../store/action/actions.js'
function ThemeSettingFunc(props) {
  const { Component } = props;
  const [visible, setVisible] = useState(false);
    const [theme, setTheme] = useState('default');
    useEffect( () =>{

    },[])
  const onOk = () => {};
  const onCancel = () => {
    setVisible(false);
  };
  const handleVisible = () => {
    setVisible(true);
  };

  return (
    <Component
      visible={visible}
      handleVisible={handleVisible}
      onOk={onOk}
      onCancel={onCancel}
      {...props}
    />
  );
}
function ThemeSettingLayOut(props) {
  const { onOk, onCancel, visible, handleVisible } = props;
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  return (
    <>
      <Button onClick={handleVisible}>
        Themes
        <SkinOutlined />
      </Button>
      <Modal
        visible={visible}
        title='Theme Setting'
        onCancel={onCancel}
        onOk={onOk}
      >
        <Card >
          <Card.Grid key='1' style={gridStyle}>
            default
          </Card.Grid>
          <Card.Grid key='2' style={gridStyle}>
            春风得意主题
          </Card.Grid>
          <Card.Grid style={gridStyle}>暗黑主题</Card.Grid>
          <Card.Grid style={gridStyle}>全省主题</Card.Grid>
          <Card.Grid style={gridStyle}>金色主题</Card.Grid>
          <Card.Grid style={gridStyle}>蓝色主题</Card.Grid>
          <Card.Grid style={gridStyle}>青色主题</Card.Grid>
        </Card>
      </Modal>
    </>
  );
}

export default function ThemeSetting(props) {
  return <ThemeSettingFunc Component={ThemeSettingLayOut} {...props} />;
}
