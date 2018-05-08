import React from 'react';
import { box, field, label, button, redButton } from './styles/styles';

const loginBox = (props) => {
  return (
    <div className={box}>
      <div className={label}>PLEASE SIGN IN</div>
      <input className={field} type="text" placeholder=" ENTER USERNAME" maxLength="8"/>
      <input className={field} type="password" placeholder="ENTER PASSWORD" />
      <button className={button}>SIGN IN</button>
      <button className={button} id={redButton}>REGISTER</button>
    </div>
  );
};

module.exports = loginBox;