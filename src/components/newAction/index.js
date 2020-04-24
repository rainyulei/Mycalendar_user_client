/**
 * 此组件暂时没用
 */
import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio, TimePicker } from 'antd';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { addEvent } from '../../store/action/actions';
const state = ({ event }) => {
  return {
    date: event.date,
  };
};
const ActionForm = (props) => {
  const { date, addEvent } = props;
  const [modal2Visible, setModal2Visible] = useState(false);
  const [form] = Form.useForm();

  return (
    <>
      <Button type='primary' onClick={() => setModal2Visible(true)}>
        Add new action
      </Button>
      <Modal
        title='Add new action'
        centered
        visible={modal2Visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              console.log(date);
              console.log(values, '====validateFields');
              const id = nanoid(6);
              addEvent({ date, event: { ...values, id } });
              setModal2Visible(false);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => setModal2Visible(false)}
        okText='Create'
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={{ important: 'false' }}
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[
              {
                required: true,
                message: 'Please input the title of collection!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Time'>
            <Input.Group>
              <Form.Item
                name='startAt'
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please select the time of start!',
                  },
                ]}
              >
                <TimePicker format='h:mm:ss A' placeholder='start time' />
              </Form.Item>

              <Form.Item
                name='endAt'
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please select the time of end!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (getFieldValue('startAt').isBefore(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'plain event end time late than start time!'
                      );
                    },
                  }),
                ]}
              >
                <TimePicker
                  style={{ marginleft: '40' }}
                  format='h:mm:ss A'
                  placeholder='end time'
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            className='collection-create-form_last-form-item'
            name='important'
          >
            <Radio.Group>
              <Radio value='true'>Important Event</Radio>
              <Radio value='false'>Normal Event</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default connect(state, { addEvent })(ActionForm);
