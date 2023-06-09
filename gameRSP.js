'use strict';

(() => {
  const FIGURES_RUS = ['камень', 'ножницы', 'бумага'];

  const VALID_CHARACTERS_RUS = [
    'камень', 'камен', 'каме', 'кам', 'ка', 'к',
    'ножницы', 'ножниц', 'ножни', 'ножн',
    'нож', 'но', 'н', 'бумага', 'бумаг', 'бума', 'бум', 'бу', 'б',
  ];

  const WINNING_COMBINATIONS_RUS = {
    player: ['кн', 'нб', 'бк'],
    computer: ['кб', 'нк', 'бн'],
    draw: ['кк', 'нн', 'бб'],
  };

  const getCombination = (userChoice, computerChoice) =>
    userChoice[0] + computerChoice[0];

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const game = () => {
    const result = {
      player: 0,
      computer: 0,
    };

    const getFullChoiseName = (userChoice) => {
      let fullName = '';
      for (let i = 0; i < 3; i++) {
        if (FIGURES_RUS[i][0] === userChoice[0]) {
          fullName = FIGURES_RUS[i];
        }
      }
      return fullName;
    };

    const getWinner = (userChoice, computerChoice) => {
      const combination = getCombination(userChoice, computerChoice);
      let message = '';

      if (WINNING_COMBINATIONS_RUS.player.includes(combination)) {
        message = 'Вы выиграли';
        result.player += 1;
      }

      if (WINNING_COMBINATIONS_RUS.computer.includes(combination)) {
        message = 'Вы проиграли';
        result.computer += 1;
      }

      if (WINNING_COMBINATIONS_RUS.draw.includes(combination)) {
        message = 'Ничья';
      }

      const resultMesage = `игрок - ${getFullChoiseName(userChoice)} 
      \nкомпьютер - ${computerChoice} \n ${message}`;

      return resultMesage;
    };

    const getWinnerName = () => {
      let winnerName = '';
      if (result.player > result.computer) {
        winnerName = 'player';
      } else {
        winnerName = 'computer';
      }

      return winnerName;
    };

    return function start() {
      const userChoice = prompt('камень, ножницы, бумага?');
      const computerChoice = FIGURES_RUS[getRandomIntInclusive(0, 2)];

      if (userChoice === null) {
        const exit = prompt(`Куда вы? Давайте продолжим игру?
          \n Продолжить - 'ок', выйти - любой символ`);
        if (exit === '') {
          start();
        } else {
          alert(`Результат:
          \nигрок: ${result.player} \nкомпьютер: ${result.computer}`);
          return 'EXIT';
        }
      }

      if (VALID_CHARACTERS_RUS.includes(userChoice)) {
        alert(getWinner(userChoice, computerChoice));

        if (result.player === result.computer) {
          alert('ничья, нужно сыграть еще раз');
          return start();
        }
      } else {
        return start();
      }

      const winnerName = getWinnerName();
      return winnerName;
    };
  };

  window.gameRSP = game;
})();
