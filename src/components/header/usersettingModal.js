import React, { useState } from 'react';
import { Form, Button, Modal, Input, message } from 'antd';
import { connect } from 'react-redux';
import { editUserMessage } from '../../store/action/actions';
import { checkEmail, checkUsername } from '../../connect';
import AvaterUpload from './avaterUpload';

function UserSettingModal(props) {
  const { editUserMessage, ...user } = props;
  const [vi, setVi] = useState({ visiable: false, loading: false });
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: user.avater,
    },
  ]);
  const [load, setLoad] = useState({ emailloading: '', usernameloading: '' });
  const [formUserMessageSetting] = Form.useForm();
  const handleClick = () => {
    formUserMessageSetting.setFieldsValue({
      username: user.username,
      email: user.email,
      avater: user.avater,
    });
    setVi({
      ...vi,
      visiable: true,
    });
  };
  const handleCandle = () => {
    formUserMessageSetting.setFieldsValue({
      // TODO 重置 数据
    });
    setVi({
      loading: false,
      visiable: false,
    });
  };
  const handleOk = () => {
    setVi({
      ...vi,
      loading: true,
    });
    formUserMessageSetting.validateFields().then(async (values) => {
      if (fileList.length === 0) {
        message.warning({
          content: 'no avater upload use default avator!',
        });
      }
      const formData = new FormData();
      formData.append('_id', user._id);
      formData.append('username', user.username);
      formData.append('email', user.email);
      if (fileList.length > 0) {
        fileList.forEach((file) => {
          formData.append('files[]', file);
          console.log(typeof file);
        });
      } else {
        formData.append(
          'avater',
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        );
      }

      const result = await editUserMessage(formData);
      if (result.message) {
        message.error({
          content: result.message,
        });
        setVi({
          ...vi,
          loading: false,
        });
      } else {
        message.success({
          content: 'edit success',
          duration: '2',
          onClose: () => {
            setVi({
              loading: false,
              visiable: false,
            });
          },
        });
      }
    });
  };
  return (
    <>
      <Button type='link' onClick={handleClick}>
        edit usermessage
      </Button>
      <Modal
        visible={vi.visiable}
        forceRender
        onCancel={handleCandle}
        onOk={handleOk}
        title='User message setting'
      >
        <Form form={formUserMessageSetting} layout='vertical'>
          <Form.Item
            label='username'
            name='username'
            hasFeedback
            validateStatus={load.usernameloading}
            validateTrigger='onBlur'
            shouldUpdate={(prop, next) => prop !== next}
            rules={[
              {
                required: true,
                message: 'username is required!',
              },

              {
                validator: async (rule, values) => {
                  if (values !== user.username) {
                    if (values && values.replace(' ', '').length > 0) {
                      setLoad({
                        ...load,
                        usernameloading: 'validating',
                      });
                      const result = await checkUsername(values);

                      if (result.code !== 1001) {
                        setLoad({
                          ...load,
                          usernameloading: 'error',
                        });
                        throw new Error(result.error);
                      }
                      setLoad({
                        ...load,
                        usernameloading: 'success',
                      });
                    }
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='email'
            name='email'
            hasFeedback
            validateStatus={load.emailloading}
            validateTrigger='onBlur'
            rules={[
              { required: true, message: 'email is required' },
              { type: 'email', message: 'email is not validate' },
              {
                validator: async (rule, values) => {
                  if (values !== user.email) {
                    if (values && values.replace(' ', '').length > 0) {
                      setLoad({
                        ...load,
                        emailloading: 'validating',
                      });
                      const result = await checkEmail(values);
                      if (result.code !== 1001) {
                        setLoad({
                          ...load,
                          emailloading: 'error',
                        });
                        throw new Error(result.error);
                      }
                      setLoad({
                        ...load,
                        emailloading: 'success',
                      });
                    }
                  }
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='avater' name='avater' valuePropName='fileList'>
            <AvaterUpload fileListt={fileList} setFileListt={setFileList} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
const state = ({ user }) => {
  return user;
};
export default connect(state, { editUserMessage })(UserSettingModal);
