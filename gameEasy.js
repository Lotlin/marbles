'use strict';

(() => {
  const oddEvenArr = ['нечетное', 'четное'];

  const isNumber = x => {
    if (Number.isInteger(+x) && (x !== null)) {
      return +x;
    } else {
      return false;
    }
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getComputerGuess = (oddEvenArr) =>
    oddEvenArr[getRandomIntInclusive(0, oddEvenArr.length - 1)];

  const game = () => {
    const ballAmount = {
      player: 5,
      computer: 5,
    };

    const getWinner = (userNumber, computerGuess) => {
      let message = '';
      if ((userNumber % 2) &&
        (computerGuess === 'нечетное') || !((userNumber % 2)) &&
          (computerGuess === 'четное')) {
        message = 'Компьютер выиграл';
        ballAmount.computer += userNumber;
        ballAmount.player -= userNumber;
      } else {
        message = 'Вы выиграли';
        ballAmount.computer -= userNumber;
        ballAmount.player += userNumber;
      }

      const result = `компьютер: ${computerGuess}. ${message}.`;

      return result;
    };

    const isGameOver = (ballAmount) => {
      let message = '';

      if (ballAmount.player <= 0) {
        message = 'Вы проиграли. У вас закончились шарики.';
        return message;
      }

      if (ballAmount.computer <= 0) {
        message = 'Ура! Вы выиграли. У компьютера закончились шарики.';
        return message;
      }

      return false;
    };

    return function start() {
      let userNumber = prompt(`Введите количество шариков
      \n(от 1 до ${ballAmount.player})`);
      const computerGuess = getComputerGuess(oddEvenArr);

      if (userNumber === null) {
        const exit = prompt(`Вы уверены, что хотите выйти? 
        \nЕсли нет - введите 0, если да - любой символ`);
        if (exit === '0') {
          return start();
        } else {
          return alert(`Результат: 
          \nигрок: ${ballAmount.player} \nкомпьютер: ${ballAmount.computer}`);
        }
      }

      userNumber = isNumber(userNumber);

      if (!(userNumber) || userNumber < 0 || userNumber > ballAmount.player) {
        return start();
      }

      alert(getWinner(userNumber, computerGuess));
      alert(`Счет: 
      \nигрок - ${ballAmount.player} компьютер - ${ballAmount.computer}`);

      if (isGameOver(ballAmount)) {
        alert(isGameOver(ballAmount));
        return false;
      }

      return start();
    };
  };

  window.marblesEasy = game;
})();
