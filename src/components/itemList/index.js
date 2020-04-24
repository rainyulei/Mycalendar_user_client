import { List, Card, Empty } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import AddnewAction from '../../components/actionModel/createButton';
import { sortDataListByStartAt } from '../../utiles';
import {
  CheckCircleOutlined,
  TagOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { deleteEvent, editEvent } from '../../store/action/actions';
const { Meta } = Card;
const store = ({ event }) => {
  let events;
  if (event.events && event.events.length > 0) {
    events = sortDataListByStartAt(event.events);
  } else {
    events = event.events;
  }
  return {
    date: event.date,
    events: events,
  };
};
function ItemList(props) {
  const {
    date,
    events,
    deleteEvent,
    editEvent,
    setModal2Visible,
    setEvent,
  } = props;

  const getEventById = (id) => {
    return events.find((item) => item.id === id);
  };

  const handleCardClick = (id) => {
    const eventBYid = getEventById(id);
    setEvent(eventBYid);
    setModal2Visible(true);
  };
  const handleFinishedClick = (id) => {
    const clickEvent = getEventById(id);
    editEvent({
      date,
      event: { ...clickEvent, finished: !clickEvent.finished },
    });
  };
  const handleFocusClick = (id) => {
    const clickEvent = getEventById(id);
    editEvent({
      date,
      event: { ...clickEvent, focus: !clickEvent.focus },
    });
  };
  /**
   * 删除
   */
  const handleDelete = (id) => {
    deleteEvent({ date, id });
  };
  // console.log(events, 'events===============================');
  return events.length === 0 ? (
    <Empty
      description={<span>Today no action! you can relax!</span>}
    >
      <AddnewAction name={'Add a task  push myself !'} type={'primary'} setEvent={setEvent} />
    </Empty>
  ) : (
    <List
    style={{ width: '100%', float: 'left' }}
      itemLayout='vertical'
      grid={{
        gutter: 1,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={events}
      renderItem={(event) => (
        <List.Item key={event.id}>
          <Card
            style={{ marginTop: 16, marginLeft: 4, marginRight: 4 }}
            title={event.title}
            extra={
              <CloseOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopPropagation();
                  handleDelete(event.id);
                }}
              />
            }
            hoverable
            bordered
            //TODO 完成的按钮显示为 绿色 关注的项目 为黄色 重要的项目为橙色 普通项目为灰色
            onClick={() => {
              handleCardClick(event.id);
            }}
            actions={[
              <CheckCircleOutlined
                style={event.finished ? { color: 'green' } : null}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  handleFinishedClick(event.id);
                }}
              />,
              <TagOutlined
                style={event.focus ? { color: 'orange' } : null}
                onClick={(e) => {
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  handleFocusClick(event.id);
                }}
              />,
            ]}
          >
            <Meta
              title={
                event.finished
                  ? 'Finished'
                  : !!event.important
                  ? 'Important'
                  : 'Normal'
              }
              style={
                event.finished
                  ? { color: 'gray' }
                  : !!event.important
                  ? { color: 'red' }
                  : {}
              }
              description={event.description}
            />
          </Card>
        </List.Item>
      )}
    ></List>
  );
}
export default connect(store, { deleteEvent, editEvent })(ItemList);
