import React, { Component } from 'react';
import StarsFrame from './StarsFrame';
import ButtonFrame from './ButtonFrame';
import AnswerFrame from './AnswerFrame';
import NumbersFrame from './NumbersFrame';
import DoneFrame from './DoneFrame';

const possibleCombinationSum = (arr, n) => {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

class Game extends Component {
  constructor() {
    super();
    this.state = {
      numberOfStars: this.randomNumber(),
      selectedNumbers: [],
      usedNumbers: [],
      redraws: 5,
      correct: null,
      doneStatus: null
    };
  }

  randomNumber = () => Math.floor(Math.random() * 9) + 1

  resetGame = () => {
    this.setState({
      numberOfStars: this.randomNumber(),
      selectedNumbers: [],
      usedNumbers: [],
      redraws: 5,
      correct: null,
      doneStatus: null
    });
  }

  possibleSolutions = () => {
    const numberOfStars = this.state.numberOfStars;
    const usedNumbers = this.state.usedNumbers;
    const possibleNumbers = [];
    for (let i = 1; i <= 9; i++) {
      if (usedNumbers.indexOf(i) < 0) {
        possibleNumbers.push(i);
      }
    }

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }

  updateDoneStatus = () => {
    if (this.state.usedNumbers.length === 9) {
      this.setState({
        doneStatus: 'Done. Nice!'
      });
    } else {
      if (this.state.redraws === 0 && !this.possibleSolutions()) {
        this.setState({
          doneStatus: 'Game Over!'
        });
      }
    }
  }

  selectNumber = (number) => {
    if (this.state.selectedNumbers.indexOf(number) < 0 && this.state.usedNumbers.indexOf(number) < 0) {
      this.setState({
        selectedNumbers: this.state.selectedNumbers.concat(number),
        correct: null
      });
    }
  }

  unselectNumber = (number) => {
    const selectedNumbers = this.state.selectedNumbers;
    const indexOfNumber = this.state.selectedNumbers.indexOf(number);
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState({
      selectedNumbers: selectedNumbers,
      correct: null
    });
  }

  checkAnswer = () => {
    const sumOfSelectedNumbers = this.state.selectedNumbers.reduce((accum, element) => accum + element, 0);
    const correct = this.state.numberOfStars === sumOfSelectedNumbers;
    this.setState({
      correct: correct
    });
  }

  acceptAnswer = () => {
    const usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, () => this.updateDoneStatus() );
  }

  redraw = () => {
    if (this.state.redraws > 0) {
      this.setState({
        numberOfStars: this.randomNumber(),
        correct: null,
        redraws: this.state.redraws - 1,
        selectedNumbers: []
      }, () => this.updateDoneStatus());
    }
  }

  render() {
    const selectedNumbers = this.state.selectedNumbers;
    const usedNumbers = this.state.usedNumbers;
    const numberOfStars = this.state.numberOfStars;
    const correct = this.state.correct;
    const redraws = this.state.redraws;
    const doneStatus = this.state.doneStatus;

    const bottomFrame = (doneStatus ?
      <DoneFrame
        doneStatus={doneStatus}
        resetGame={this.resetGame} />
      :
      <NumbersFrame
        selectedNumbers={selectedNumbers}
        usedNumbers={usedNumbers}
        selectNumber={this.selectNumber} />
    );

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          <ButtonFrame
            selectedNumbers={selectedNumbers}
            correct={correct}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws} />
          <AnswerFrame
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber} />
        </div>
        {bottomFrame}
      </div>
    );
  }
}

export default Game;
