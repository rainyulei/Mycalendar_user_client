import React from 'react';
import { Layout } from 'antd';
const { Header, Sider, Content } = Layout;
export default function TodoLayout(props) {
  const { children } = props;
  return (
    <Layout>
      <Header
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          background: 'white',
        }}
      >
        {children[0]}
      </Header>
      <Content
        style={{
          overflow: 'auto',
          minHeight: '100vh',
          position: 'fixed',
          width: '100%',
          padding: '0 50px',
          marginTop: 100,
        }}
      >
        <Layout>
          <Header>{children[1]}</Header>
          <Content
            style={{
              marginTop: 10,
              minHeight: '70vh',
            }}
          >
            {children[2]}
          </Content>
        </Layout>
      </Content>
      {/* <Sider theme='light' width='30%'
                // defaultCollapsed collapsedWidth='0'
               
                style={{overflow: 'auto',height: '100vh', position: 'fixed',marginTop: 100, left: '69%' }}>
                {children[3]}
                
            </Sider> */}
    </Layout>
  );
}
