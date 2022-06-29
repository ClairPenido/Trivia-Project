import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuracao from './pages/Configuracao';

export default function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/configuracao" component={ Configuracao } />
    </div>
  );
}
