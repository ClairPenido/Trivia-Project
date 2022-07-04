import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  message = () => {
    const { score } = this.props;
    const point = 3;
    return score < point ? 'Could be better...' : 'Well Done!';
  };

  handlePlayAgain = () => {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

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
        <div>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.handlePlayAgain }
          >
            Play Again
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score });

export default connect(mapStateToProps, null)(Feedback);
