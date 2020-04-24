import React, { useState } from 'react';
import { Button, Space } from 'antd';
import LoginModel from './login';
import SignUpModel from './regiest';

function GroupButton() {
  const [loginvisible, setloginvisible] = useState(false);
  const [signupvisible, setsignupvisible] = useState(false);
  const handleLogin = () => {
    setloginvisible(true);
  };
  const handleSignUp = () => {
    setsignupvisible(true);
  };
  return (
    <>
      <Space size={20}>
        <Button id="Login" onClick={handleLogin}>Log In</Button>
        <Button id="signUp" type='primary' onClick={handleSignUp}>Sign Up</Button>
      </Space>
      <LoginModel
        loginvisible={loginvisible}
        setloginvisible={setloginvisible}
      />
      <SignUpModel
        signupvisible={signupvisible}
        setsignupvisible={setsignupvisible}
      />
    </>
  );
}

export default GroupButton;
