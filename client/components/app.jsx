import React from 'react';
import ReactDOM from 'react-dom';
import Blocks from './blocks';
import GameScreen from './game_screen'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setIntervalInstance = null;
    this.state = {
      blockSize: [8, 40],
      blocksDatum: [0, 0],
      gameScreen: [],
      boardSize: [0, 5],
      boardDatum: [24, 17],
      ballSize: [0, 1],
      ballDatum: [23, 19],
      ballVelocity: {
        magnitude: 0,
        direction: [0, 0],
      },
      boardVelocity: {
        magnitude: 0,
        direction: [0, 0],
      },
    };
  }

  componentWillMount() {
    this.setState({
      gameScreen: this.createGameScreen(25, 40),
    }, () => this.baseState = this.state);
  }

  createGameScreen(rows, columns) {
    let gameScreen = Array(rows).fill().map(() => Array(columns).fill(0));;
    gameScreen = this.addBlocksToGameScreen(gameScreen, this.state.blocksDatum, this.state.blockSize, 1);
    gameScreen = this.addBlocksToGameScreen(gameScreen, this.state.boardDatum, this.state.boardSize, 2);
    gameScreen = this.addBlocksToGameScreen(gameScreen, this.state.ballDatum, this.state.ballSize, 3);
    return gameScreen;
  }

  addBlocksToGameScreen(gameScreen, datum, size, value) {
    for (let i = datum[0]; i <= datum[0] + size[0]; i += 1) {
      for (let j = datum[1]; j < datum[1] + size [1]; j += 1) {
        gameScreen[i][j] = value;
      }
    }
    return gameScreen;
  }

  animateBoard(e) {
    const keyMaps = {
      ArrowLeft: [0, -1],
      ArrowRight: [0, 1],
    };
    const keyMap = keyMaps[e.key];
    const boardVelocity = {
      magnitude: 100,
      direction: keyMap,
    }

    if(keyMap) {
      let ballVelocity = this.state.ballVelocity
      if(this.state.ballVelocity.magnitude === 0) {
        ballVelocity = this.calculateBallVelocity(boardVelocity, 'board');
      } 
      let boardDatum = this.state.boardDatum;
      let gameScreen = this.addBlocksToGameScreen(this.state.gameScreen, boardDatum, this.state.boardSize, 0);
      boardDatum = [boardDatum[0] + keyMap[0], Math.min(Math.max(boardDatum[1] + keyMap[1], 0), 35)];
      gameScreen = this.addBlocksToGameScreen(gameScreen, boardDatum, this.state.boardSize, 2);
      this.setState({ gameScreen, boardDatum, ballVelocity, boardVelocity}, this.animateBall);
    }
  }

  handleKeyUp(e) {
    if(e.key === 'ArrowRight' || e.key === 'ArrowRight') {
      const boardVelocity = {
        magnitude: 0,
        direction: [0, 0],
      }
      this.setState({ boardVelocity });
    }
    
  }

  animateBall() {
    if(this.setIntervalInstance === null) {
      const setIntervalInstance = setInterval(() => this.moveBall(), this.state.ballVelocity.magnitude)
      this.setIntervalInstance = setIntervalInstance;
    }
  }

  moveBall() {
    let gameScreen = this.state.gameScreen;
    let ballDatum = this.state.ballDatum;
    let ballVelocity = this.state.ballVelocity;
    const deltaRow = ballVelocity.direction[0];
    const deltaColumn = ballVelocity.direction[1];
    gameScreen[ballDatum[0]][ballDatum[1]] = 0;
    ballDatum = [ballDatum[0] + deltaRow, ballDatum[1] + deltaColumn];
    if(ballDatum[0] === 25) {
      this.resetGame();
      return;
    }
    gameScreen[ballDatum[0]][ballDatum[1]] = 3;
    this.checkCollision(gameScreen, ballDatum);
  }

  calculateBallVelocity(obstacleVelocity, type) {
    let newDirection;
    if(type === 'board') {
      let newHorizontalDirection = obstacleVelocity.direction[1];
      if(obstacleVelocity.direction[1] === 0) {
        newHorizontalDirection  = this.state.ballVelocity.direction[1]
      }
      newDirection = [-1, newHorizontalDirection];
    } else {
      newDirection = obstacleVelocity.direction;
    }
    let ballVelocity = {
      magnitude: obstacleVelocity.magnitude,
      direction: newDirection,
    }
    return ballVelocity;

  }

  resetGame() {
    alert('game over');
    this.setState(this.baseState, () => this.setState({ gameScreen: this.createGameScreen(25, 40) }));
    clearInterval(this.setIntervalInstance);
    this.setIntervalInstance = null;
  }

  checkCollision(gameScreen, ballDatum) {
    console.log(this.state.gameScreen)
    let ballDirection = this.state.ballVelocity.direction;
    const ballMagnitude = this.state.ballVelocity.magnitude;
    let ballVelocity = this.state.ballVelocity;
    if(ballDatum[0] === 0) {
      ballDirection[0] = -1 * (ballDirection[0]);
      ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude}); 
    }
    if(ballDatum[0] < 24) {
      if(gameScreen[ballDatum[0] + 1][ballDatum[1]] === 2) {
        ballVelocity = this.calculateBallVelocity(this.state.boardVelocity, 'board');
      }
      if(gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1] + ballDirection[1]] === 2) {
        ballDirection = [-1 * (ballDirection[0]), -1 * (ballDirection[1])];
        ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude}, 'board');
      }
      if(gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1] + ballDirection[1]] === 1 && 
        gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1]] === 0 && 
        gameScreen[ballDatum[0]][ballDatum[1] + ballDirection[1]] === 0) {
        gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1] + ballDirection[1]] = 0;
        ballDirection = [-1 * (ballDirection[0]), -1 * (ballDirection[1])];
        ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude});  
      }
      if(gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1]] === 1) {
        gameScreen[ballDatum[0] + ballDirection[0]][ballDatum[1]] = 0;
        ballDirection[0] = -1 * (ballDirection[0]);
        ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude});
      }
    }
    if(ballDatum[1] === 39 || ballDatum[1] === 0) {
      ballDirection[1] = -1 * (ballDirection[1]);
      ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude}); 
    }

    if(gameScreen[ballDatum[0]][ballDatum[1] + ballDirection[1]] === 1) {
      gameScreen[ballDatum[0]][ballDatum[1] + ballDirection[1]] = 0;
      ballDirection[1] = -1 * (ballDirection[1]);
      ballVelocity = this.calculateBallVelocity({direction: ballDirection, magnitude: ballMagnitude});  
    }
    this.setState({ gameScreen, ballVelocity, ballDatum });
  }

  render() {
    return(
      <GameScreen moveBoardHandler={e => this.animateBoard(e)} handleKeyUp={e => this.handleKeyUp(e)} gameScreen={this.state.gameScreen}/>
    );
  }
}

export default App;