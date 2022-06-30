import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getAvatar = () => {
    const { email } = this.props;
    const hash = md5(email).toString();
    const link = `https://www.gravatar.com/avatar/${hash}`;
    return link;
  }

  render() {
    const { name, score } = this.props;

    return (
      <header>
        <div>
          <img
            src={ this.getAvatar() }
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
