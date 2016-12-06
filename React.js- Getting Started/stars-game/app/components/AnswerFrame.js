import React, { Component } from 'react';

class AnswerFrame extends Component {
  render() {
    const numbers = this.props.selectedNumbers.map((number, index) => {
      return <div className="number" onClick={() => this.props.unselectNumber(number)} key={index}>{number}</div>;
    });
    return (
      <div id="answer-frame">
        <div className="well">
          {numbers}
        </div>
      </div>
    );
  }
}

export default AnswerFrame;
