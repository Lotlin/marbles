'use strict';
(() => {
  const oddEvenArr = ['нечетное', 'четное'];

  const isNumber = x => {
    if (Number.isInteger(+x) && (x !== null)) {
      return +x;
    } else if (x === null) {
      return null;
    } else {
      return false;
    }
  };

  const isOdd = num => num % 2;

  const isNumberAllowed = (num, max, min = 1) => {
    if (num < min || num > max) {
      return false;
    }

    return true;
  };

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const isGuessedRight = (number, guess) => {
    if ((isOdd(number) &&
      (guess === 'нечетное')) || (!isOdd(number) && guess === 'четное')) {
      return true;
    }

    return false;
  };

  const getComputerGuess = (oddEvenArr) =>
    oddEvenArr[getRandomIntInclusive(0, oddEvenArr.length - 1)];

  const getUserGuess = (userGuess) => {
    let newUserGuess = userGuess;
    if (isOdd(newUserGuess)) {
      newUserGuess = 'нечетное';
    } else {
      newUserGuess = 'четное';
    }

    return newUserGuess;
  };

  const getPlayersRole = (guesser = 'computer') => {
    let gamer = '';
    let waiting = '';

    if (guesser === 'computer') {
      gamer = 'Компьютер';
      waiting = 'Игрок';
    } else {
      gamer = 'Игрок';
      waiting = 'Компьютер';
    }

    const result = {
      gamer,
      waiting,
    };

    return result;
  };

  const getMessage = (number, guess) => {
    if (isGuessedRight(number, guess)) {
      return 'выиграл';
    }

    return 'проиграл';
  };

  const game = () => {
    const ballAmount = {
      player: 5,
      computer: 5,
    };

    const exitGame = (exit) => {
      if (exit === '0') {
        return false;
      }
      alert(`Результат: 
      \nигрок: ${ballAmount.player} \nкомпьютер: ${ballAmount.computer}`);
      return true;
    };

    const getComputerNumber = (ballAmount) => {
      const computerNumber = getRandomIntInclusive(1, ballAmount.computer);

      return computerNumber;
    };

    const countPoints = (number, guess, guesser = 'computer') => {
      if (getPlayersRole(guesser).gamer === 'Компьютер') {
        if (isGuessedRight(number, guess)) {
          ballAmount.computer += number;
          ballAmount.player -= number;
        } else {
          ballAmount.computer -= number;
          ballAmount.player += number;
        }
      } else {
        if (isGuessedRight(number, guess)) {
          ballAmount.computer -= number;
          ballAmount.player += number;
        } else {
          ballAmount.computer += number;
          ballAmount.player -= number;
        }
      }

      return true;
    };

    const getWinner = (number, guess, guesser = 'computer') => {
      countPoints(number, guess, guesser);
      const message =
        `${getPlayersRole(guesser).gamer} ${getMessage(number, guess)}.`;

      return message;
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
      alert('Ход игрока.');

      let userNumber = prompt(`Введите количество шариков
      \n(от 1 до ${ballAmount.player})`);

      while (userNumber === null) {
        const exit = prompt(`Вы уверены, что хотите выйти? 
        \nЕсли нет - введите 0, если да - любой символ`);
        if (exitGame(exit)) {
          return true;
        } else {
          userNumber = prompt(`Вы уверены, что хотите выйти? 
          \nЕсли нет - введите 0, если да - любой символ'`);
        }
      }

      userNumber = isNumber(userNumber);

      if (!isNumberAllowed(userNumber, ballAmount.player)) {
        return start();
      }

      const computerGuess = getComputerGuess(oddEvenArr);

      alert(`Компьютер: ${computerGuess}.`);
      alert(getWinner(userNumber, computerGuess));
      alert(`Счет:
      \nигрок - ${ballAmount.player} компьютер - ${ballAmount.computer}`);

      if (isGameOver(ballAmount)) {
        alert(isGameOver(ballAmount));
        return false;
      }

      alert('Ход компьютера.');
      const computerNumber = getComputerNumber(ballAmount);

      let userGuess = prompt('Угадывайте 1 - нечетное, 2 - четное?');

      while (userGuess === null) {
        const exit = prompt(`Вы уверены, что хотите выйти?
        \nЕсли нет - введите 0, если да - любой символ`);
        if (exitGame(exit)) {
          return true;
        }
        userGuess = prompt('Угадывайте 1 - нечетное, 2 - четное?');
      }

      userGuess = isNumber(userGuess);

      while (!(userGuess) || !isNumberAllowed(userGuess, 2)) {
        while (userGuess === null) {
          const exit = prompt(`Вы уверены, что хотите выйти?
          \nЕсли нет - введите 0, если да - любой символ`);
          if (exitGame(exit)) {
            return true;
          }
          userGuess = prompt('Угадывайте 1 - нечетное, 2 - четное?');
        }
        userGuess = isNumber(prompt('Угадывайте 1 - нечетное, 2 - четное?'));
      }

      userGuess = getUserGuess(userGuess);

      alert(`Компьютер: ${computerNumber}.`);
      alert(getWinner(computerNumber, userGuess, 'user'));
      alert(`Счет:
      \nигрок - ${ballAmount.player} компьютер - ${ballAmount.computer}`);

      if (isGameOver(ballAmount)) {
        alert(isGameOver(ballAmount));
        return false;
      }

      return start();
    };
  };

  window.marblesMiddle = game;
})();
