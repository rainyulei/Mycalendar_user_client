import React, { useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Drawer, Button, Timeline, Typography, DatePicker, Form } from 'antd';
import {
  ClockCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import store2 from 'store2';
import {
  DateChangeToMoment,
  sortDataListByStartAtAndEndAt,
} from '../../utiles';

const { RangePicker } = DatePicker;

function EventTimeLine(props) {
  const { listData } = props;
  return (
    <Timeline mode='left'>
      {listData.map((item) => {
        if (item.day) {
          return (
            <Timeline.Item
              dot={<ClockCircleOutlined style={{ fontSize: '16px' }} />}
              label={item.day}
              color='red'
              key={item.day}
            />
          );
        } else {
          const itemIsStartTime = item.type === 'start' ? true : false;
          const it = item.item;

          return (
            <Timeline.Item
              label={
                itemIsStartTime
                  ? moment(it.startAt).format('YYYY-MM-DD HH:mm:ss') + '  Start'
                  : moment(it.endAt).format('YYYY-MM-DD HH:mm:ss') + '  End'
              }
              color={it.important ? 'green' : it.focus ? 'orange' : ''}
              key={itemIsStartTime ? 'start' + it.id : 'end' + it.id}
              dot={
                itemIsStartTime ? (
                  <DownCircleOutlined style={{ fontSize: '13px' }} />
                ) : (
                  <UpCircleOutlined style={{ fontSize: '13px' }} />
                )
              }
            >
              <Typography.Title level={4}>
                {it.finished ? it.title + ' Has Finished !' : it.title}
              </Typography.Title>
              <Typography.Text>{it.description}</Typography.Text>
            </Timeline.Item>
          );
        }
      })}
    </Timeline>
  );
}

function DrawerForm(props) {
  const { date } = props;
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState([]);
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  const rangeConfig = {
    rules: [{ type: 'array', required: true, message: 'Please select time!' }],
  };
  /**
   * 通过开始时间和结束时间 来找出之间的数据
   * @param {开始时间} startTime
   * @param {*结束时间} endTime
   * @returns {*返回的数据为 数组  内部保存为对象 格式为{日期：[项目数据]}}
   */
  function getTimeRangeData([startTime, endTime]) {
    const allData = store2.getAll();
    const keys = Object.keys(allData);
    let newDataList = [];
    keys.map((date) => {
      const momentDay = DateChangeToMoment(date);
      if (momentDay.isBetween(startTime, endTime,null,"[]")) {
        const listData = allData[date].filter((item) => {
          return (
            moment(item.startAt).isBetween(startTime, endTime,null,"[]") &&
            moment(item.endAt).isBetween(startTime, endTime,null,"[]")
          );
        });
        newDataList.push({ [date]: listData });
        return date;
      }
      return null;
    });
    return newDataList;
  }
  /**
   * 获取可以用于timeline  渲染的数据
   */
  const getData = (listData) => {
    const newList = [];
    listData.forEach((dayData) => {
      const day = Object.keys(dayData)[0];
      newList.push({ day });
      const newDayEvent = sortDataListByStartAtAndEndAt(dayData[day]);
      newList.push(...newDayEvent);
    });
    return newList;
  };
  const showDrawer = () => {
    // TODO 使用 use ref  缓存上一次的状态 
    const initMomentGroup = [
      moment(date + ' 00:00:00', 'YYYY-MM-DD HH:mm:ss'),
      moment(date + ' 11:59:59', 'YYYY-MM-DD HH:mm:ss'),
    ]
    form.setFieldsValue({
      rangeTimeLine: initMomentGroup,
    });
    const initvalue = getTimeRangeData(initMomentGroup);
    const listvalue = getData(initvalue);
    setListData(listvalue);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  //TODO  VALUEcHANGE
  //TODO bug 跨天的事件 不能正确渲染到当前天日期下
  const onValuesChange = (changedValues, allValues) => {
    const { rangeTimeLine } = changedValues;
    const initvalue = getTimeRangeData(rangeTimeLine);
    const listvalue = getData(initvalue);
    setListData(listvalue);
  };
  return (
    <>
      <Button type='primary' onClick={showDrawer}>
        Event Calendar
      </Button>
      <Drawer
        forceRender={true}
        destroyOnClose={false}
        title={
          <>
            <Typography.Title level={3}>TimeLine</Typography.Title>
            <Form
              form={form}
              {...formItemLayout}
              onValuesChange={onValuesChange}
            >
              <Form.Item name='rangeTimeLine' label='' {...rangeConfig}>
                <RangePicker
                  showTime
                  format='YYYY-MM-DD HH:mm:ss'
                  separator='~'
                />
              </Form.Item>
            </Form>
          </>
        }
        width={'40%'}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ marginleft: 40, paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          ></div>
        }
      >
        <EventTimeLine listData={listData} />
      </Drawer>
    </>
  );
}
const state = ({ event }) => {
  return {
    date: event.date,
  };
};
export default connect(state, {})(DrawerForm);
