import React from 'react';
import { Route } from 'react-router-dom';
import Configuracao from './pages/Configuracao';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <div>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/configuracao" component={ Configuracao } />
    </div>
  );
}
