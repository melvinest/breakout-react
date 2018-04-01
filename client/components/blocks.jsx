import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';
import styles from './styles/blocks_style.css';

const Blocks = (props) => {
  const blocks = [];
  for (let i = 0; i < props.rowNumber; i += 1) {
    for (let j = 0; j < props.columnNumber; j += 1) {
      blocks.push(<Block key={[i, j]}row={i} column={j}/>);
    }
  }
  return (<div className={styles.container}>{blocks}</div>);
};

export default Blocks;