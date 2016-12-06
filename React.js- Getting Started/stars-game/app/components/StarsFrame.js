import React, { Component } from 'react';

class StarsFrame extends Component {
  render() {
    const numberOfStars = this.props.numberOfStars;
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<span className="glyphicon glyphicon-star" key={i}></span>);
    }
    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
}

export default StarsFrame;
