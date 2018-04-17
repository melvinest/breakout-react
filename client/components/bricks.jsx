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
    // console.log(this.state.bricks)
    const bricks = [];
    for (let i = 0; i < this.rowNumber * this.columnNumber; i += 1) {
      bricks.push(<Brick key={i} />);
    }
    // console.log(bricks)
    return (<div>{bricks}</div>);
  }
}

export default Bricks;
