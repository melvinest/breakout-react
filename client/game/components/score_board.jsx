import React from 'react';
import styles from './styles/screen_style.css';

const ScoreBoard = ({ score }) => {
  return (<div className={styles.scoreBoard}>{score}</div>);
};

export default ScoreBoard;
