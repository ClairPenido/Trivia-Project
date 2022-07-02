import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Testa a página de login', () => {
  it('Deve conter os elementos da página e o botão de jogar deve estar desabilitado enquanto não forem preenchidos os inputs', () => {

    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    const buttonConfig = screen.getByTestId('btn-settings');
    
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(buttonConfig).toBeInTheDocument();

    userEvent.type(inputName, 'Gabriel');
    expect(playBtn).toBeDisabled();
    expect(inputName.value).toBe('Gabriel');
    expect(playBtn).toBeDisabled();

    userEvent.type(inputEmail, 'gabriel.lima@trybe.com');
    expect(inputEmail.value).toBe('gabriel.lima@trybe.com');
    expect(playBtn).not.toBeDisabled();
  });

  it('Deve fazer requisição a API e redirecionar a página do jogo', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    jest.spyOn(global, 'fetch');
    
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');

    userEvent.type(inputName, 'Teste');
    userEvent.type(inputEmail, 'Teste@teste.com');
    userEvent.click(buttonPlay);

    expect(global.fetch).toHaveBeenCalled();
    await waitFor(() => expect(inputName).not.toBeInTheDocument(), { timeout: 2000 });
    const { pathname } = history.location;
    expect(pathname).toBe('/game');
  });

  it('Deve direcionar para a página de configurações ao apertar o botão referente.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const buttonConfig = screen.getByTestId('btn-settings');
    userEvent.click(buttonConfig);
    const { pathname } = history.location;
    expect(pathname).toBe('/configuracao');
  });
});