import defaultPic from "../assets/gamepictures/default.png";
import birds from "../assets/matchMatch/birds.jpeg";
import cat from "../assets/matchMatch/cat.jpeg";
import dog from "../assets/matchMatch/dog.jpeg";
import donkey from "../assets/matchMatch/donkey.jpeg";
import fox from "../assets/matchMatch/fox.png";
import ghost from "../assets/matchMatch/ghost.png";
import wolf from "../assets/matchMatch/wolf.png";
import giene from "../assets/matchMatch/giene.jpeg";
import littledog from "../assets/matchMatch/littledog.jpeg";
import racoon from "../assets/matchMatch/racoon.jpeg";
import quizzer from "../assets/gamepictures/quizzer.png";
import chess from "../assets/gamepictures/chess.jpeg";
import ticTacToe from "../assets/gamepictures/ticTacToe.jpeg";
import snake from "../assets/gamepictures/snake.jpeg";
import battleship from "../assets/gamepictures/battleship.webp";
import tetris from "../assets/gamepictures/tetris.png";
import cloneInvaders from "../assets/cloneInvaders/cloneInvaders.webp";
interface IGamePics {
  [key: string]: string;
}

export const gamePics: IGamePics = {
  default: defaultPic,
  quizzer: quizzer,
  chess: chess,
  ticTacToe: ticTacToe,
  snake: snake,
  battleship: battleship,
  cloneInvaders: cloneInvaders,
  tetris: tetris,
};

export const matchMatchPics = [
  {
    name: "birds",
    pic: birds,
    flipped: false,
    disabled: false,
  },
  {
    name: "dog",
    pic: dog,
    flipped: false,
    disabled: false,
  },
  {
    name: "cat",
    pic: cat,
    flipped: false,
    disabled: false,
  },
  {
    name: "donkey",
    pic: donkey,
    flipped: false,
    disabled: false,
  },
  {
    name: "fox",
    pic: fox,
    flipped: false,
    disabled: false,
  },
  {
    name: "ghost",
    pic: ghost,
    flipped: false,
    disabled: false,
  },
  {
    name: "giene",
    pic: giene,
    flipped: false,
    disabled: false,
  },
  {
    name: "littledog",
    pic: littledog,
    flipped: false,
    disabled: false,
  },
  {
    name: "racoon",
    pic: racoon,
    flipped: false,
  },
  {
    name: "wolf",
    pic: wolf,
    flipped: false,
    disabled: false,
  },
];
