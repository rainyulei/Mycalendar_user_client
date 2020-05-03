/*
 * @Author: yu-lei
 * @Date: 2020-04-29 18:16:33
 * @Last Modified by: yu-lei
 * @Last Modified time: 2020-04-29 18:49:48
 */
import React from 'react';
import Weather from '../weather';
import Logo from '../logo';
import LoginButtonGroup from '../loginButtonGroup';
import Timer from '../timer';

const Header = () => {
  return (
    <>
          <Logo />
          <Weather />
          <Timer />
          <LoginButtonGroup />
     
    </>
  );
};

export default Header;
