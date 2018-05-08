import React from 'react';
import LoginBox from './login_box';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <div>leaderBoards</div>
        <LoginBox />
      </div>
    );
  }
}

module.exports = App;
