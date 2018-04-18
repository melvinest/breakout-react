import React from 'react';
import Bricks from './bricks';
import Plank from './plank';
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
    this.initPlankPosition = [this.screenSize / 2 - this.plankDimensions.length / 2, this.screenSize - this.plankDimensions.width],
    this.state = {
      ballPosition: [this.screenSize / 2, this.screenSize - this.ballSize - this.plankDimensions.width],
      ballDirection: 60,
      ballSpeed: 5,
    };
    this.moveBall();
  }

  changeBallPosition() {
    const { ballPosition } = this.state;
    const ballDirection = this.checkBallCollision();
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
    if (ballPosition[1] <= 0 || ballPosition[1] >= this.screenSize - this.ballSize) {
      changeDirections[1] = true;
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
    // setInterval(() => {
    //   this.changeBallPosition();
    // }, 1);
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
    };

    const plankProps = {
      ballPosition: this.state.ballPosition,
      ballSpeed: this.state.ballSpeed,
      ballSize: this.ballSize,
      ballDirection: this.state.ballDirection,
      position: this.initPlankPosition,
      handleBrickCollision: (arr) => { this.handleBrickCollision(arr); },
    };
    return (
      <div className={styles.screen} >
        <Bricks {...bricksProps} />
        <div className={styles.ball} style={ballPosition} />
        <Plank {...plankProps} />
      </div>
    );
  }
}

export default App;
