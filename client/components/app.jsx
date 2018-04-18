import React from 'react';
import Bricks from './bricks';
import Plank from './plank';
import ScoreBoard from './score_board';
import styles from './styles/screen_style.css';

class App extends React.Component {
  static getAngle([hor, ver]) {
    let newBallDirection;
    if (hor === 0) {
      newBallDirection = 0;
    } else {
      newBallDirection = (180 * Math.atan(Math.abs(ver / hor))) / Math.PI;
    }
    if (hor > 0 && ver < 0) {
      newBallDirection = 360 - newBallDirection;
    }
    if (hor < 0) {
      if (ver > 0) {
        newBallDirection = 180 - newBallDirection;
      }
      if (ver < 0) {
        newBallDirection = 180 + newBallDirection;
      }
    }
    return newBallDirection;
  }

  constructor(props) {
    super(props);
    this.ballSize = 10;
    this.screenSize = 600;
    this.plankDimensions = { length: 80, width: 15 };
    this.initPlankPosition = [this.screenSize / 2 - this.plankDimensions.length / 2, this.screenSize - this.plankDimensions.width];
    this.initBallPosition = [this.screenSize / 2 - this.ballSize / 2, this.screenSize - this.ballSize - this.plankDimensions.width]
    this.state = {
      ballPosition: JSON.parse(JSON.stringify(this.initBallPosition)),
      ballDirection: null,
      ballSpeed: 3,
      score: 0,
      reset: false,
      start: false,
    };
  }

  changeBallPosition() {
    const ballDirection = this.checkBallCollision();
    const { ballPosition } = this.state;
    const horPosition = ballPosition[0] + (this.state.ballSpeed * Math.cos((Math.PI * ballDirection) / 180));
    const verPosition = ballPosition[1] + (this.state.ballSpeed * Math.sin((Math.PI * ballDirection) / 180));
    const newBallPosition = [horPosition, verPosition];
    this.setState({
      ballPosition: newBallPosition,
      ballDirection,
    });
  }

  checkBallCollision() {
    const { ballPosition } = this.state;
    const changeDirections = [false, false];
    if (ballPosition[0] <= 0 || ballPosition[0] + this.ballSize >= this.screenSize - this.ballSize) {
      changeDirections[0] = true;
    }
    if (ballPosition[1] <= 0) {
      changeDirections[1] = true;
    }
    if (ballPosition[1] >= this.screenSize - this.ballSize) {
      alert(`Game Over Your Score is ${this.state.score}`);
      this.restart();
      return null;
    }
    return this.changeBallDirection(changeDirections);
  }

  changeBallDirection([changeHor, changeVer]) {
    const { ballDirection } = this.state;
    const ballDirectionComponents = [Math.cos((Math.PI * ballDirection) / 180), Math.sin((Math.PI * ballDirection) / 180)];
    if (changeHor) ballDirectionComponents[0] *= -1;
    if (changeVer) ballDirectionComponents[1] *= -1;
    const newBallDirection = App.getAngle(ballDirectionComponents);
    return newBallDirection;
  }

  handleBrickCollision(changeDirections) {
    const ballDirection = this.changeBallDirection(changeDirections);
    this.setState({ ballDirection });
  }

  moveBall() {
    this.currentInterval = setInterval(() => {
      if (this.state.ballSpeed > 0) {
        this.changeBallPosition();
      }
    }, 1);
  }

  increaseScore() {
    const score = this.state.score + 1;
    this.setState({ score });
  }

  startGame(key) {
    console.log(key);
    console.log(this.state)
    const moves = {
      ArrowUp: 270,
      ArrowLeft: 225,
      ArrowRight: 315,
    };
    this.setState({
      ballDirection: moves[key],
      start: true,
    }, () => { this.moveBall(); });
  }

  restart() {
    clearInterval(this.currentInterval);
    this.setState({
      reset: true,
      ballPosition: JSON.parse(JSON.stringify(this.initBallPosition)),
      start: false,
      score: 0,
    },
    () => { this.setState({ reset: false }); });
  }

  render() {
    const ballPosition = {
      top: `${this.state.ballPosition[1]}px`,
      left: `${this.state.ballPosition[0]}px`,
    };
    const bricksProps = {
      ballPosition: this.state.ballPosition,
      ballSpeed: this.state.ballSpeed,
      ballSize: this.ballSize,
      ballDirection: this.state.ballDirection,
      handleBrickCollision: (arr) => { this.handleBrickCollision(arr); },
      increaseScore: () => { this.increaseScore(); },
      reset: this.state.reset,
    };

    const plankProps = {
      ballPosition: this.state.ballPosition,
      ballSpeed: this.state.ballSpeed,
      ballSize: this.ballSize,
      ballDirection: this.state.ballDirection,
      position: this.initPlankPosition,
      plankDimensions: this.plankDimensions,
      handleBrickCollision: (arr) => { this.handleBrickCollision(arr); },
      reset: this.state.reset,
      startGame: (key) => { this.startGame(key); },
      start: this.state.start,
    };
        
    return (
      <div>
        <div className={styles.banner}>Breakout React</div>
        <div className={styles.container}>
          <ScoreBoard score={this.state.score} />
          <div className={styles.screen}>
            <Plank {...plankProps} />
            <div className={styles.ball} style={ballPosition} />
            <Bricks {...bricksProps} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
