import React from 'react';
import './index.css';
const Logo = () => {
  return (
    <div className='logo'>
      <a href='http://localhost:3000'>
        <div className='base_bord'>
          <div className='left'>
            <span className="first_word">
              MYPLAN
            </span>
            <span className="second_word">
              20
            </span>
            <span className="third_word">
              My
            </span>
            <span className="forth_word">
              CALENDAR
            </span>
          </div>
          <div className='right'>
            <span className="five_word">
              20
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
export default Logo;
