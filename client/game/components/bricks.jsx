import React from 'react';
import Brick from './brick';
import styles from './styles/screen_style.css';

class Bricks extends React.Component {
  constructor(props) {
    super(props);
    this.rowNumber = 15;
    this.columnNumber = 15;
  }

  render() {
    const bricks = [];
    for (let i = 0; i < this.rowNumber * this.columnNumber; i += 1) {
      bricks.push(<Brick key={i} {...this.props} ballSize={this.props.ballSize} />);
    }
    return (<div className={styles.bricksContainer}>{bricks}</div>);
  }
}

export default Bricks;
