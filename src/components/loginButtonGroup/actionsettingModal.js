import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editUserSetting } from '../../store/action/actions';
import { Form, Modal, Select, Switch, Button, message } from 'antd';
const Option = Select.Option;

function SignUpModel(props) {
  const { user, editUserSetting } = props;
  const [visibal, setvisival] = useState(false);
  const [confimLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const resetFields = () => {
    form.setFieldsValue({
      connectRange: user.connectRange,
      upcomingEventRange: user.upcomingEventRange,
      eventremend: user.eventremend,
      finished: user.finished,
      lated: user.lated,
      latedRange: user.latedRange,
      staledated: user.staledated,
      staledatedRange: user.staledatedRange,
    });
  };
  useEffect(resetFields, [resetFields]);
  const handleCancel = () => {
    resetFields();
    setvisival(false);
  };
  const messageClose = () => {
    setvisival(false);
  };
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      setConfirmLoading(true);
      console.log(values);
      const result = await editUserSetting({ ...user, ...values });
      console.log(result);
      if (!result.message) {
        setConfirmLoading(false);
        message.success({
          content: 'change success!',
          onClose: messageClose,
        });
      } else {
        setConfirmLoading(false);
        message.error(result.message);
      }
    });
  };
  const handleShow = () => {
    setvisival(true);
  };
  return (
    <>
      <Button type='link' onClick={handleShow}>
        Action setting
      </Button>
      <Modal
        forceRender
        visible={visibal}
        onCancel={handleCancel}
        onOk={handleOk}
        title='Edit Action setting!'
        confirmLoading={confimLoading}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='connectRange'
            label='conenct and update with the service'
            rules={[{ required: true, message: 'connectRange need selected' }]}
          >
            <Select>
              <Option value='3'>3 mins</Option>
              <Option value='5'>5 mins</Option>
              <Option value='10'>10 mins</Option>
              <Option value='20'>20 mins</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='upcomingEventRange'
            label='report your actions in feature'
            rules={[
              { required: true, message: 'upcomingEventRange need selected' },
            ]}
          >
            <Select>
              <Option value='8'>8 hours</Option>
              <Option value='16'>16 hours</Option>
              <Option value='24'>24 hours</Option>
              <Option value='48'>48 hours</Option>
              <Option value='168'>1 weeks</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='eventremend'
            label='report your actions before is action'
            rules={[{ required: true, message: 'eventremend need selected' }]}
          >
            <Select>
              <Option value='5'>5 mins</Option>
              <Option value='10'>10 mins</Option>
              <Option value='20'>20 mins</Option>
              <Option value='40'>40 mins</Option>
              <Option value='60'>60 mins</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label='finished events checked'
            name='finished'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          <Form.Item label='lated events checked' style={{ marginBottom: '0' }}>
            <Form.Item
              name='lated'
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              valuePropName='checked'
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name='latedRange'
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                margin: '0 6px',
              }}
              rules={[{ required: true, message: 'latedRange need selected' }]}
            >
              <Select>
                <Option value='8'>8 hours</Option>
                <Option value='16'>16 hours</Option>
                <Option value='24'>24 hours</Option>
                <Option value='48'>48 hours</Option>
                <Option value='168'>1 week</Option>
              </Select>
            </Form.Item>
          </Form.Item>
          <Form.Item label='staledated events checked'>
            <Form.Item
              name='staledated'
              valuePropName='checked'
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
            >
              <Switch />
            </Form.Item>
            <Form.Item
              name='staledatedRange'
              style={{
                display: 'inline-block',
                width: 'calc(50% - 12px)',
                margin: '0 6px',
              }}
              rules={[
                { required: true, message: 'staledatedRange need selected' },
              ]}
            >
              <Select>
                <Option value='8'>8 hours</Option>
                <Option value='16'>16 hours</Option>
                <Option value='24'>24 hours</Option>
                <Option value='48'>48 hours</Option>
                <Option value='168'>1 week</Option>
              </Select>
            </Form.Item>
          </Form.Item>

          {/* <Form.Item name="staledated" label='staledated events checked' valuePropName="checked">
            <Switch defaultChecked />
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}
const state = ({ user }) => {
  return { user };
};
export default connect(state, { editUserSetting })(SignUpModel);
