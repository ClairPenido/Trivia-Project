import React, { Component } from 'react';

export default class Login extends Component {
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
            disabled={ this.buttonCheck() }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}
