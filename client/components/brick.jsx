import React from 'react';
import styles from './styles/screen_style.css';

class Brick extends React.Component {
  static randomizeBrickColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return { backgroundColor: `rgb(${r},${g},${b})` };
  }

  static randomizeExistence() {
    return !!Math.round(Math.random());
  }

  constructor(props) {
    super(props);
    this.brickDimensions = { length: 40, width: 15 };
    this.state = {
      exist: null,
      color: null,
    };
  }

  componentDidMount() {
    this.styleBrick();
  }

  componentDidUpdate() {
    if (this.node) {
      this.getBoundaries();
      this.checkCollision();
    }
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

  styleBrick() {
    const color = Brick.randomizeBrickColor();
    const exist = Brick.randomizeExistence();
    this.setState({ color, exist });
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
        this.setState({ exist: false });
        changeDirection[0] = true;
        this.props.handleBrickCollision(changeDirection);
      }
      if (ballRight >= this.boundaries.left && ballRight < this.boundaries.right && horizontalDirection > 0) {
        this.setState({ exist: false });
        changeDirection[0] = true;
        this.props.handleBrickCollision(changeDirection);
      }
    }
    if ((this.boundaries.left < ballLeft && this.boundaries.right > ballLeft) ||
        (this.boundaries.right > ballRight && this.boundaries.left < ballRight)) {
      if (ballTop <= this.boundaries.bottom && ballTop > this.boundaries.top && verticalDirection < 0) {
        this.setState({ exist: false });
        changeDirection[1] = true;
        this.props.handleBrickCollision(changeDirection);
      }
      if (ballBottom >= this.boundaries.top && ballBottom < this.boundaries.bottom && verticalDirection > 0) {
        this.setState({ exist: false });
        changeDirection[1] = true;
        this.props.handleBrickCollision(changeDirection);
      }
    }
  }
  render() {
    if (this.state.exist === null) return null;
    if (this.state.exist) {
      return (<div className={styles.brick} ref={(node) => { this.node = node; }} style={this.state.color} />);
    }
    return (<div className={styles.hiddenBrick} />);
  }
}

export default Brick;
