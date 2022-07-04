import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  render() {
    return (
      <div>
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

export default connect()(Feedback);
