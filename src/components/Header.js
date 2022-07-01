import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/gravatar';

class Header extends Component {
  render() {
    const { email, name, score } = this.props;

    return (
      <header>
        <div>
          <img
            src={ getAvatar(email) }
            data-testid="header-profile-picture"
            alt={ name }
          />
          <h2 data-testid="header-player-name">{ name }</h2>
          <h2 data-testid="header-score">{ score }</h2>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score });

export default connect(mapStateToProps, null)(Header);
