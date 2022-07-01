import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  message = () => {
    const { assertions } = this.props;
    const point = 3;
    console.log(assertions);
    return assertions <= point ? 'Could be better...' : 'Well Done!';
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          { this.message() }
        </h3>
        <div>
          <h3 data-testid="feedback-total-score">{ score }</h3>
          <h3 data-testid="feedback-total-question">{ assertions }</h3>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score });

export default connect(mapStateToProps, null)(Feedback);
