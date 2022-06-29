import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchToken from '../services/token';

class Login extends Component {
  state = {
    userName: '',
    userEmail: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  buttonCheck = () => {
    const { userName, userEmail } = this.state;
    const LENGTH_LIMIT = 1;
    let isDisabled = true;
    if (userName.length >= LENGTH_LIMIT && userEmail.length >= LENGTH_LIMIT) {
      isDisabled = false;
    }
    return isDisabled;
  }

  handleClick = async () => {
    const { history } = this.props;
    const tokenResponse = await fetchToken();
    const { token } = tokenResponse;
    localStorage.setItem('token', token);
    history.push('/game');
  }

  handleConfig = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  render() {
    const { userName, userEmail } = this.state;
    return (
      <div>
        <form>
          <input
            placeholder="Nome"
            required
            type="text"
            data-testid="input-player-name"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
          />
          <input
            placeholder="Email"
            required
            type="email"
            data-testid="input-gravatar-email"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="btn-play"
            className=""
            disabled={ this.buttonCheck() }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleConfig }
          >
            Configurações
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
