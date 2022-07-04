import React, { Component } from 'react';
import './Game.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { sendUserScore } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    score: '',
    options: [],
    currentQuestion: 0,
    selected: '',
    error: false,
  };

  fetchQuestions = async () => {
    const { history } = this.props;
    const localToken = localStorage.getItem('token');

    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`);
      const data = await response.json();
      this.setState({ questions: data.results, options: this.setOption(data.results) });
    } catch (error) {
      localStorage.removeItem('token');
      history.push('/');
      console.log(error);
    }
  }

  handleShuffle = (options) => {
    const RANDOM_NUMBER = 0.5;
    return options.sort(() => Math.random() - RANDOM_NUMBER);
  };

  setOption = (questions) => {
    const { currentQuestion } = this.state;
    const thisReturn = questions ? this.handleShuffle([
      questions[currentQuestion]?.correct_answer,
      ...questions[currentQuestion]?.incorrect_answers,
    ]) : null;
    return thisReturn;
  }

  handleSelect = (option) => {
    const { selected, questions, currentQuestion } = this.state;
    const correct = questions[currentQuestion]?.correct_answer;
    if (selected === option && selected === correct) {
      return 'select';
    } if (selected === option && selected !== correct) {
      return 'wrong';
    } if (option === correct) {
      return 'select';
    } if (option !== correct) {
      return 'wrong';
    }
  }

  handleCheck = (option) => {
    const { dispatch } = this.props;
    const { questions, currentQuestion, score } = this.state;
    const correct = questions[currentQuestion]?.correct_answer;
    this.setState({ selected: option });
    if (option === correct) {
      dispatch(sendUserScore(score));
      this.setState({ error: false });
    }
  }

  handleQuit = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/');
  }

  handleNext = () => {
    const { currentQuestion, selected, questions } = this.state;
    const { history } = this.props;
    const QUESTIONS_LIMIT = 5;

    if (currentQuestion > QUESTIONS_LIMIT) {
      history.push('/feedback');
    } else if (selected) {
      this.setState((prev) => ({ currentQuestion: prev.currentQuestion + 1 }), () => {
        this.setState({ options: this.setOption(questions) });
        this.setState({ selected: '' });
      });
    } else {
      this.setState({ error: 'Selecione uma opção primeiro' });
    }
  };

  componentDidMount = async () => {
    await this.fetchQuestions();
  }

  render() {
    const { questions, options, currentQuestion, selected, error } = this.state;
    const correct = questions[currentQuestion]?.correct_answer;
    return (
      <div>
        <Header />
        <hr />
        {questions.length > 0 && (
          <div>
            <p data-testid="question-category">{questions[currentQuestion].category}</p>
            <h3 data-testid="question-text">{questions[currentQuestion].question}</h3>
            <div className="options" data-testid="answer-options">
              {error && <p>Por favor selecione uma resposta</p>}
              {
                options
                && options.map((option, index) => (
                  <button
                    data-testid={
                      option === correct ? 'correct-answer' : `wrong-answer-${index}`
                    }
                    type="button"
                    className={ `singleOption ${selected && this.handleSelect(option)}` }
                    key={ index }
                    disabled={ selected }
                    onClick={ () => this.handleCheck(option) }
                  >
                    {option}
                  </button>
                ))
              }
            </div>
            <div className="controls" />
            <button
              type="button"
              onClick={ this.handleQuit }
            >
              Quit

            </button>
            {/* visibility: selected === '' ? 'hidden' : 'visible' */}
            {selected === '' ? (
              null
            )
              : (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.handleNext }
                >
                  Next
                </button>
              )}
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
