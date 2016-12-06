import React, { Component } from 'react';

class NumbersFrame extends Component {
  render() {
    const numbers = [];
    for (let i = 1; i <= 9; i++) {
      let className = "number selected-" + (this.props.selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (this.props.usedNumbers.indexOf(i) >= 0);
      numbers.push(<div className={className} onClick={() => this.props.selectNumber(i)} key={i}>{i}</div>)
    }
    return (
      <div id="numbers-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

export default NumbersFrame;
