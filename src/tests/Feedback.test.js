import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Feedback from '../pages/Feedback'
import App from '../App'

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

describe('Testando a página de feedback', () => {
  it('Deve conter as informações do joagdor', () => {
    renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});

    const gravatarImg = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');

    expect(gravatarImg).toBeInTheDocument();
    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  })
it('Deve exibir o resultado do jogador', () => {
  renderWithRouterAndRedux(<Feedback /> , {exampleReducer: INITIAL_STATE});

  const totalScore = screen.getByTestId('feedback-total-score');
  const questions = screen.getByTestId('feedback-total-question');

  expect(totalScore).toBeInTheDocument();
  expect(questions).toBeInTheDocument();
})
it('Deve existir a opção para o usuário jogar novamente', () => {
  const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );

  const playAgain = screen.getByRole('button', {name: /play again/i})
  userEvent.click(playAgain);

  expect(history.location.pathname).toBe('/');
})
it('Deve existir a opção para o usuário se direcionar a página de ranking', () => {
  const { history } = renderWithRouterAndRedux(<App /> , INITIAL_STATE, "/feedback" );

  const rankingBtn = screen.getByRole('button', {name: /ranking/i})
  userEvent.click(rankingBtn);
  expect(history.location.pathname).toBe('/ranking');
})
it('Deve exibir a mensagem caso os acertos sejam menor que 3', () => {
  const INITAL_STATE = { player: { score: 5, assertions: 2, gravatarEmail: 'glima7591@gmail.com', name: 'Gabriel' }};

  renderWithRouterAndRedux(<Feedback />, INITAL_STATE);

  expect(screen.getByText(/could be better\.\.\./i)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /profile\-user/i })).toBeInTheDocument();
  expect(screen.getByText(/gabriel/i)).toBeInTheDocument();
  expect(screen.getAllByText(/5/i).length).toBe(2);
  expect(screen.getByText(/2/i)).toBeInTheDocument();
});

it('Deve exibir mensagem caso os acertos sejam maior que 3', () => {
  const response = "https://www.gravatar.com/avatar/7ddd17efc658c67dc39654e9d896b764e013f03388f0ebaec45537abb5c9fa98";

  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(response),
  });

  const INITAL_STATE = { player: { score: 5, assertions: 4, gravatarEmail: 'glima7591@gmail.com', name: 'Gabriel' }};
  renderWithRouterAndRedux(<Feedback />, INITAL_STATE);

  expect(screen.getByText(/Well Done!/i)).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalled();
  expect(global.fetch).toHaveBeenCalledWith('https://www.gravatar.com/avatar/7ddd17efc658c67dc39654e9d896b764e013f03388f0ebaec45537abb5c9fa98');
});
})
