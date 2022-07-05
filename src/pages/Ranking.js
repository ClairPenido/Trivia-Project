import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/gravatar';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      arrayOrdenado: [],
    };
  }

  componentDidMount() {
    const ls = JSON.parse(localStorage.getItem('ranking'));
    const lsOrdenado = ls.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(lsOrdenado));
    this.setState({ arrayOrdenado: lsOrdenado });
  }

  handleInicio = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { arrayOrdenado } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {arrayOrdenado.map((p, index) => (
              <tr key={ p.email }>
                <td>
                  <img
                    src={ getAvatar(p.email) }
                    data-testid="profile-picture"
                    alt={ p.name }
                  />
                </td>
                <td data-testid={ `player-name-${index}` }>
                  { p.name }
                </td>
                <td data-testid={ `player-score-${index}` }>
                  { p.score }
                </td>
              </tr>))}
          </tbody>
        </table>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handleInicio }
        >
          Inicio
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
