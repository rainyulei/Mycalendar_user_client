import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { addEvent, editEvent } from '../../store/action/actions';
const state = ({ event }) => {
  return {
    date: event.date,
  };
};
const ActionForm = (props) => {
  const {
    date,
    addEvent,
    editEvent,
    modal2Visible,
    setModal2Visible,
    event,
    setEvent,
  } = props;
  const [formiii] = Form.useForm();
  useEffect(() => {
    if (event) {
      formiii.setFieldsValue({
        title: event.title,
        important: event.important,
        startAt: moment(event.startAt),
        endAt: moment(event.endAt),
        description: event.description,
      });
    } else {
      formiii.setFieldsValue({
        important: false,
        title: null,
        startAt: moment(),
        endAt: moment(),
        description: null,
      });
    }
    return () => {
      formiii.setFieldsValue({
        important: false,
      });
    };
  }, [event, formiii]);
  return (
    <Modal
      title='Add new action'
      centered
      forceRender={true}
      destroyOnClose={false}
      getContainer={false}
      visible={modal2Visible}
      onOk={() => {
        formiii
          .validateFields()
          .then((values) => {
            formiii.resetFields();
            if (event) {
              editEvent({ date, event: Object.assign(event, values) });
            } else {
              const id = nanoid(6);
              addEvent({  date, event: { ...values, id } });
            }
            setModal2Visible(false);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      onCancel={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopPropagation();
        setEvent(null);
        setModal2Visible(false);
      }}
      okText='Im Sure'
    >
      <Form form={formiii} layout='vertical'>
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
              <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='start time'  showTime={true} />
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
                    const startAt = moment(getFieldValue('startAt'));

                    if (startAt.isBefore(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'plain event end time late than start time!'
                    );
                  },
                }),
              ]}
            >
              <DatePicker
                style={{ marginleft: '40' }}
                format='YYYY-MM-DD HH:mm:ss'
                showTime={true}
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
            <Radio value={true}>Important Event</Radio>
            <Radio value={false}>Normal Event</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default connect(state, { addEvent, editEvent })(ActionForm);
