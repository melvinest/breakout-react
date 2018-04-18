import React from 'react';
import styles from './styles/screen_style.css';

class Plank extends React.Component {
  constructor(props) {
    super(props);
    this.plankSpeed = 20;
    this.state = {
      position: this.props.position,
      keyDowns: {
        ArrowLeft: false,
        ArrowRight: false,
        ArrowUp: false,
        ArrowDown: false,
      },
    };
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (e) => { this.handleKeyDown(e); });
  }

  getBoundaries() {
    const top = this.node.offsetTop;
    const right = this.node.offsetLeft + this.brickDimensions.length;
    const bottom = this.node.offsetTop + this.brickDimensions.width;
    const left = this.node.offsetLeft;
    const centerHorizontal = this.node.offsetLeft + (this.brickDimensions.length / 2);
    const centerVertical = this.node.offsetTop + (this.brickDimensions.width / 2);
    this.boundaries = {
      top, right, bottom, left, centerVertical, centerHorizontal,
    };
  }

  checkCollision() {
    const ballBottom = this.props.ballPosition[1] + this.props.ballSize;
    const ballTop = this.props.ballPosition[1];
    const ballLeft = this.props.ballPosition[0];
    const ballRight = this.props.ballPosition[0] + this.props.ballSize;
    const ballCenterVertical = this.props.ballPosition[1] + (this.props.ballSize / 2);
    const changeDirection = [false, false];
    const verticalDirection = Math.sign(Math.sin((Math.PI * this.props.ballDirection) / 180));
    const horizontalDirection = Math.sign(Math.cos((Math.PI * this.props.ballDirection) / 180));
    if (this.boundaries.top < ballCenterVertical && this.boundaries.bottom > ballCenterVertical) {
      if (ballLeft <= this.boundaries.right && ballLeft > this.boundaries.left && horizontalDirection < 0) {
        changeDirection[0] = true;
        this.props.handleBrickCollision(changeDirection);
      }
      if (ballRight >= this.boundaries.left && ballRight < this.boundaries.right && horizontalDirection > 0) {
        changeDirection[0] = true;
        this.props.handleBrickCollision(changeDirection);
      }
    }
    if ((this.boundaries.left < ballLeft && this.boundaries.right > ballLeft) ||
        (this.boundaries.right > ballRight && this.boundaries.left < ballRight)) {
      if (ballTop <= this.boundaries.bottom && ballTop > this.boundaries.top && verticalDirection < 0) {
        changeDirection[1] = true;
        this.props.handleBrickCollision(changeDirection);
      }
      if (ballBottom >= this.boundaries.top && ballBottom < this.boundaries.bottom && verticalDirection > 0) {
        changeDirection[1] = true;
        this.props.handleBrickCollision(changeDirection);
      }
    }
  }

  movePlank(key) {
    const moves = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowDown: 1,
    };
    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      const { position } = this.state;
      position[0] = Math.min(Math.max(position[0] + (moves[key] * this.plankSpeed), 0), 520);
      this.setState({ position });
    }
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      const { position } = this.state;
      position[1] = Math.min(Math.max(position[1] + (moves[key] * this.plankSpeed), 0), 585);
      this.setState({ position });
    }
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight' ||
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown') {
      this.movePlank(e.key);
    }
  }

  render() {
    const ballPosition = {
      top: `${this.state.position[1]}px`,
      left: `${this.state.position[0]}px`,
    };
    return (<div className={styles.plank} style={ballPosition}  />);
  }
}

export default Plank;
