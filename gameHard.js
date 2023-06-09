'use strict';
(() => {
  const messages = {
    greeting: `Добро пожаловать в игру. 
    \nПервым ходит тот, кто победит в 'камень, ножницы, бумага.'`,
    playerTurn: `Ход игрока.`,
    computerTurn: `Ход компьютера.`,
    dontLeave: `Куда вы? Давайте продолжим игру? 
    \nПродолжить - 'ок', выйти - любой символ.`,
    guess: `Угадывайте 1 - нечетное, 2 - четное.`,
    playAgain: `Хотите сыграть еще? Да - клавиша 'ок', нет - любая другая.`,
    computerGuessed: `компьютер загадал:`,
    gameScore: `Счет -  вы : компьютер -`,
    enterBallAmount: `Введите количество шариков. Допустимо: от 1 до`,
    lost: `Вы проиграли. У вас закончились шарики.`,
    won: `Ура! Вы выиграли. У компьютера закончились шарики.`,
  };

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
    if ((isOdd(number) && (guess === 'нечетное')) ||
      (!isOdd(number) && guess === 'четное')) {
      return true;
    }

    return false;
  };

  const getComputerGuess = (oddEvenArr) =>
    oddEvenArr[getRandomIntInclusive(0, oddEvenArr.length - 1)];

  const changeToCyrillicUserGuess = (userGuess) => {
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

    let currentWinnerRSP = '';

    const exitGame = (exit) => {
      if (exit === '') {
        return false;
      }

      // eslint-disable-next-line max-len
      alert(`${messages.gameScore} ${ballAmount.player} : ${ballAmount.computer}`);
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

    const isGameOver = () => {
      if (ballAmount.player <= 0) {
        alert(`${messages.lost}`);
        return 'EXIT';
      }

      if (ballAmount.computer <= 0) {
        alert(`${messages.won}`);
        return 'EXIT';
      }

      return false;
    };

    const playerMoveDeclaration = () => alert(messages.playerTurn);

    const getUserNumber = () =>
      prompt(`${messages.enterBallAmount} ${ballAmount.player}`);

    const getResult = (number, guess, guesser = 'computer') => {
      alert(getWinner(number, guess, guesser));
      // eslint-disable-next-line max-len
      alert(`${messages.gameScore} ${ballAmount.player} : ${ballAmount.computer}`);

      return isGameOver();
    };

    const isUserLeave = () => {
      const exit = prompt(messages.dontLeave);
      if (exitGame(exit)) {
        return true;
      }
      return false;
    };

    const getUserGuess = () => prompt(messages.guess);

    const isUserGuessedNull = (userGuess, isGuess = true) => {
      let checking = userGuess;
      while (checking === null) {
        if (isUserLeave()) {
          return 'EXIT';
        }
        if (isGuess) {
          checking = getUserGuess();
        } else {
          checking = getUserNumber();
        }
      }
      return checking;
    };

    const computerDecisionDeclaration = (computerNumber) => {
      alert(`${messages.computerGuessed} ${computerNumber}`);
    };


    const playerMove = () => {
      playerMoveDeclaration();

      let userNumber = getUserNumber();

      userNumber = isUserGuessedNull(userNumber, false);
      if (userNumber === 'EXIT') {
        return 'EXIT';
      }

      userNumber = isNumber(userNumber);

      if (!isNumberAllowed(userNumber, ballAmount.player)) {
        return playerMove();
      }

      const computerGuess = getComputerGuess(oddEvenArr);

      computerDecisionDeclaration(computerGuess);

      const result = getResult(userNumber, computerGuess);

      return result;
    };

    const isUserGuessAllowed = (userGuess) => {
      if (!userGuess || !isNumberAllowed(userGuess, 2)) {
        return false;
      }

      return true;
    };

    const checkUserGuess = () => {
      let userGuess = getUserGuess();

      userGuess = isUserGuessedNull(userGuess);
      if (userGuess === 'EXIT') {
        return 'EXIT';
      }

      userGuess = isNumber(userGuess);

      while (!isUserGuessAllowed(userGuess)) {
        userGuess = isUserGuessedNull(userGuess);
        if (userGuess === 'EXIT') {
          return 'EXIT';
        }
        userGuess = isNumber(userGuess = getUserGuess());
      }

      return userGuess;
    };

    const computerMoveDeclaration = () => {
      alert(messages.computerTurn);
    };

    const processingUserGuess = () => {
      let userGuess = checkUserGuess();

      if (userGuess === 'EXIT') {
        return 'EXIT';
      }

      userGuess = changeToCyrillicUserGuess(userGuess);

      return userGuess;
    };

    const computerMove = () => {
      computerMoveDeclaration();

      const computerNumber = getComputerNumber(ballAmount);
      const userGuess = processingUserGuess();

      if (userGuess === 'EXIT') {
        return 'EXIT';
      }

      computerDecisionDeclaration(computerNumber);

      const result = getResult(computerNumber, userGuess, 'player');

      return result;
    };

    const updateData = () => {
      ballAmount.player = 5;
      ballAmount.computer = 5;
      return true;
    };

    const playAgain = () => {
      const message = prompt(messages.playAgain);

      if (message === '') {
        updateData();
        return true;
      }

      return false;
    };

    return function start() {
      const startRSP = window.gameRSP();
      let winnerRSP = '';

      console.log(currentWinnerRSP);

      if (!currentWinnerRSP) {
        alert(messages.greeting);
        winnerRSP = startRSP();
      }

      if (winnerRSP === 'EXIT') {
        if (playAgain()) {
          return start();
        }

        return true;
      }

      if (winnerRSP === 'player' || currentWinnerRSP === 'player') {
        currentWinnerRSP = 'player';

        const playerResult = playerMove();
        if (playerResult === 'EXIT') {
          if (playAgain()) {
            currentWinnerRSP = '';
            return start();
          }
          return true;
        }

        const computerResult = computerMove();
        if (computerResult === 'EXIT') {
          if (playAgain()) {
            currentWinnerRSP = '';
            return start();
          }
          return true;
        }
      }

      if (winnerRSP === 'computer' || currentWinnerRSP === 'computer') {
        currentWinnerRSP = 'computer';

        const computerResult = computerMove();
        if (computerResult === 'EXIT') {
          if (playAgain()) {
            currentWinnerRSP = '';
            return start();
          }
          return true;
        }

        const playerResult = playerMove();
        if (playerResult === 'EXIT') {
          if (playAgain()) {
            currentWinnerRSP = '';
            return start();
          }
          return true;
        }
      }

      return start();
    };
  };

  window.marblesHard = game;
})();
