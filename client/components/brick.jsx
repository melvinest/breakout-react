import React from 'react';
import styles from './styles/screen_style.css';

class Brick extends React.Component {
  constructor(props) {
    super(props);
    this.brickDimensions = [40, 15];
    this.state = {
      exist: null,
      color: null,
    };
  }

  componentDidMount() {
    const color = this.randomizeBrickColor();
    const exist = this.randomizeExistence();
    this.setState({ color, exist }); 
  }

  randomizeBrickColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return {backgroundColor: `rgb(${r},${g},${b})`}
  }

  randomizeExistence() {
    return !!Math.round(Math.random());
  }

  render() {
    if(this.state.exist === null) return null;
    if (this.state.exist) {
      return (<div className={styles.brick} style={this.state.color}></div>);
    }
    return (<div className={styles.hiddenBrick}></div>);
  }
}

export default Brick;