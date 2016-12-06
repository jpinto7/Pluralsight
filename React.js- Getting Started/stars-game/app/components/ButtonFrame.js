import React, { Component } from 'react';

class ButtonFrame extends Component {
  render() {
    const correct = this.props.correct;
    let button = null;

    switch (correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer}>
            <span className="glyphicon glyphicon-ok">
            </span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove">
            </span>
          </button>
        );
        break;
      default:
        const disabled = this.props.selectedNumbers.length === 0;
        button = (
          <button disabled={disabled} onClick={this.props.checkAnswer} className="btn btn-primary btn-lg">=</button>
        );
    }

    return (
      <div id="button-frame">
        {button}
        <br/><br/>
        <button disabled={this.props.redraws === 0} className="btn btn-warning btn-xs" onClick={this.props.redraw}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {this.props.redraws}
        </button>
      </div>
    );
  }
}

export default ButtonFrame;
