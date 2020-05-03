import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addUser } from '../../store/action/actions';
import { Form, Modal, Input } from 'antd';
import { checkEmail, checkUsername } from '../../connect';
import md5 from 'md5';

function SignUpModel(props) {
  const { signupvisible, setsignupvisible, addUser } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState({
    emailLoading: '',
    usernameLoading: '',
  });
  
  const [formSignUp] = Form.useForm();
  const handleCandle = () => {
    setsignupvisible(false);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    formSignUp.validateFields().then(async (values) => {
      values.password = await md5(values.password);
      const result = await addUser({
        username: values.username,
        email: values.Email,
        password: values.password,
      });
      setConfirmLoading(false);
      if (result) {
        formSignUp.resetFields();
        setsignupvisible(false);
      }
    });
  };
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 14 },
  };
  const validateMessages = {
    required: 'Please input your ${name}!',
    type: 'The input is not valid ${name}!',
    // ...
  };
  return (
    <Modal
      title='Sign Up'
      forceRender
      destroyOnClose={false}
      confirmLoading={confirmLoading}
      visible={signupvisible}
      onCancel={handleCandle}
      onOk={handleOk}
    >
      <Form form={formSignUp} validateMessages={validateMessages} {...layout}>
        <Form.Item
          name='Email'
          label='Email:'
          validateTrigger='onBlur'
          validateFirst={true}
          validateStatus={loading.emailLoading}
          hasFeedback
          rules={[
            { required: true },
            {
              type: 'email',
            },
            {
              validator: async (rule, value) => {
                if (value && value.replace(' ', '').length > 0) {
                  setLoading({
                    ...loading,
                    emailLoading: 'validating',
                  });
                  const result = await checkEmail(value);
                  console.log(result);
                  if (result.code !== 1001) {
                    setLoading({
                      ...loading,
                      emailLoading: 'error',
                    });
                    throw new Error(result.error);
                  }
                  setLoading({
                    ...loading,
                    emailLoading: 'success',
                  });
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='username'
          label='Username:'
          validateTrigger='onBlur'
          validateFirst
          hasFeedback
          validateStatus={loading.usernameLoading}
          rules={[
            { required: true },
            {
              validator: async (rule, value) => {
                if (value && value.replace(' ', '').length > 0) {
                  setLoading({ ...loading, usernameLoading: 'validating' });
                  const result = await checkUsername(value);
                  console.log(result);
                  if (result.code !== 1001) {
                    setLoading({
                      ...loading,
                      emailLoading: 'error',
                    });
                    throw new Error(result.error);
                  }
                  setLoading({ ...loading, usernameLoading: 'success' });
                }
              },
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='password'
          label='Password'
          rules={[
            { required: true },
            {
              min: 6,
              message: 'password need longer than 6 char!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        {/* <FormItem name="location" label="location" hasFeedback >
          
        </FormItem> */}
      </Form>
    </Modal>
  );
}

export default connect(null, { addUser })(SignUpModel);
