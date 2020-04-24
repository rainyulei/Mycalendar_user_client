import React from 'react';
import { Spin, Alert } from 'antd';
const DefaultLoading = () => {
  return (
    <Spin tip='Loading...'>
      <Alert
        message='正在请求中......'
        description='Further details about the context of this alert.'
        type='info'
      />
    </Spin>
  );
};
export default DefaultLoading;
