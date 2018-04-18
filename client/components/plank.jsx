import React from 'react';
import styles from './styles/screen_style.css';

class Plank extends React.Component {
  constructor(props) {
    super(props);
    this.position = [260, 585];
  }
  render() {
    const ballPosition = {
      top: `${this.position[1]}px`,
      left: `${this.position[0]}px`,
    };
    return (<div className={styles.plank} style={ballPosition} />);
  }
}

export default Plank;
