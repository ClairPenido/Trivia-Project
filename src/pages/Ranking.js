import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getAvatar from '../services/gravatar';
import { clearState } from '../redux/actions';

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
    const { history, dispatch } = this.props;
    dispatch(clearState);
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
            {console.log(arrayOrdenado)}
            {arrayOrdenado.map((p, index) => (
              <tr key={ p.gravatarEmail }>
                <td>
                  <img
                    src={ getAvatar(p.gravatarEmail) }
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
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
