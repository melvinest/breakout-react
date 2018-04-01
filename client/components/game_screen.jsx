import React from 'react';
import ReactDOM from 'react-dom';
import Block from './block';
import styles from './styles/game_screen_style.css';

const GameScreen = (props) => {
  const cells = [];
  const squareStyles = [styles.empty, styles.block, styles.board, styles.ball];
  for (let i = 0; i < props.gameScreen.length; i += 1) {
    for (let j = 0; j < props.gameScreen[0].length; j += 1) {
      cells.push(<div key={[i, j]} className={squareStyles[props.gameScreen[i][j]]}></div>);
    }
  }
  return(<div className={styles.container} tabIndex="0" onKeyDown={(e) => props.moveBoardHandler(e)} onKeyUp={(e) => props.handleKeyUp(e)}>{cells}</div>);
}

export default GameScreen;