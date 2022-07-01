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
    return (
      <div>
        <Header />
        <h3 data-testid="feedback-text">
          { this.message() }
        </h3>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions });

export default connect(mapStateToProps, null)(Feedback);
