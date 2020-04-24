import React, { useState, useEffect } from 'react';
import md5 from 'md5';
import { connect } from 'react-redux';
import { login } from '../../store/action/actions';
import { Form, Modal, Input, Alert, Switch } from 'antd';

function LoginModel(props) {
  const { loginvisible, setloginvisible, login } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [alert, setalert] = useState({ visible: false, Message: '' });
  const [formLogin] = Form.useForm();
  useEffect(() => {});
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
  };
  const handlesetalertVisible = () => {
    setalert({ visible: false, Message: '' });
  };
  console.log('login');
  const handleOk = () => {
    console.log('重新渲染');
    setConfirmLoading(true);
    formLogin.validateFields().then((values) => {
      values.password = md5(values.password);
      console.log(values);
      const user = values;
      const result = login(user);
      if (result.message) {
        setalert({ visible: true, Message: result.message });
      } else {
        formLogin.resetFields();
        setloginvisible(false);
      }
      setConfirmLoading(false);
    });
  };

  const handleCancel = () => {
    formLogin.resetFields();
    handlesetalertVisible();
    setConfirmLoading(false);
    setloginvisible(false);
  };
  return (
    <>
      <Modal
        title='Log In'
        visible={loginvisible}
        forceRender
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form {...layout} form={formLogin}>
          <Form.Item
            label='Email:'
            name='email'
            rules={[
              { required: true, message: 'email is required!' },
              { type: 'email', message: 'not read type!' },
            ]}
          >
            <Input type='text' />
          </Form.Item>
          <Form.Item
            label='Password:'
            name='password'
            rules={[
              {
                required: true,
                message: 'password is required!',
              },
              {
                min: 8,
                message: 'password length less than 8 !',
              },
            ]}
          >
            <Input type='password' />
          </Form.Item>
          <Form.Item
            label='Remember me:'
            name='remember'
            help=' One month free login!'
            valuePropName="checked"
          >
            <Switch size='small' defaultChecked />
          </Form.Item>
          {alert.visible ? (
            <Alert
              message={alert.Message}
              type='error'
              closable
              showIcon
              style={{ marginTop: '20px' }}
              afterClose={handlesetalertVisible}
            />
          ) : null}
        </Form>
      </Modal>
    </>
  );
}
export default connect(null, { login })(LoginModel);
