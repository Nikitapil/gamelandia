import { createBrowserRouter } from 'react-router-dom';
import { ERoutes } from './constants';
import { Layout } from '../app/pages/Layout/Layout';
import { NotFound } from '../app/pages/NotFound/NotFound';
import { MainPage } from '../main/pages/MainPage';
import { MatchMatch } from '../games/match-match/pages/MatchMatch';
import { FlappyBird } from '../games/flappy/pages/FlappyBird';
import { ChessTypes } from '../games/chess/pages/ChessTypes';
import { Chess } from '../games/chess/pages/Chess';
import { AimGame } from '../games/aim/pages/AimGame';
import { NumbersGame } from '../games/2048/pages/NumbersGame';
import { Solitaire } from '../games/solitaire/pages/Solitaire';
import { ChessRooms } from '../games/chess/pages/ChessRooms';
import { ChessOnline } from '../games/chess/pages/ChessOnline';
import { TicTacToe } from '../games/tic-tac-toe/pages/TicTacToe';
import { Snake } from '../games/snake/pages/Snake';
import { BattleShipRooms } from '../games/battleship/pages/BattleShipRooms';
import { CloneInvaders } from '../games/clone-invaders/pages/CloneInvaders';
import { Tetris } from '../games/tetris/pages/Tetris';
import { BattleShip } from '../games/battleship/pages/BattleShip';
import { SignUp } from '../auth/pages/SignUp';
import { SignIn } from '../auth/pages/SignIn';
import { ProfileLayout } from '../profile/pages/ProfileLayout';
import { Profile } from '../profile/pages/Profile';
import { ProfileStatistics } from '../profile/pages/ProfileStatistics';
import { ProtectedRouteWithAuth } from '../components/ProtectedRouteWithAuth';
import Life from '../games/life/pages/Life';
import BrickGame from '../games/brick/pages/BrickGame';
import { AsteroidWarrior } from '../games/asteroid-warrior/pages/AsteroidWarrior';

export const router = createBrowserRouter(
  [
    {
      path: ERoutes.MAIN,
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <MainPage />
        },
        {
          path: ERoutes.MATCH_MATCH,
          element: <MatchMatch />
        },
        {
          path: ERoutes.FLAPPY,
          element: <FlappyBird />
        },
        {
          path: ERoutes.CHESS,
          element: <ChessTypes />
        },
        {
          path: ERoutes.CHESS_OFFLINE,
          element: <Chess />
        },
        {
          path: ERoutes.AIM_GAME,
          element: <AimGame />
        },
        {
          path: ERoutes.NUMBERS,
          element: <NumbersGame />
        },
        {
          path: ERoutes.SOLITAIRE,
          element: <Solitaire />
        },
        {
          path: ERoutes.CHESS_ROOMS,
          element: (
            <ProtectedRouteWithAuth>
              <ChessRooms />
            </ProtectedRouteWithAuth>
          )
        },
        {
          path: ERoutes.CHESS_ROOMS_ID,
          element: (
            <ProtectedRouteWithAuth>
              <ChessOnline />
            </ProtectedRouteWithAuth>
          )
        },
        {
          path: ERoutes.TIC_TAC,
          element: <TicTacToe />
        },
        {
          path: ERoutes.SNAKE,
          element: <Snake />
        },
        {
          path: ERoutes.BATTLESHIP,
          element: (
            <ProtectedRouteWithAuth>
              <BattleShipRooms />
            </ProtectedRouteWithAuth>
          )
        },
        {
          path: ERoutes.INVADERS,
          element: <CloneInvaders />
        },
        {
          path: ERoutes.TETRIS,
          element: <Tetris />
        },
        {
          path: ERoutes.LIFE,
          element: <Life />
        },
        {
          path: ERoutes.BRICK,
          element: <BrickGame />
        },
        {
          path: ERoutes.ASTEROID,
          element: <AsteroidWarrior />
        },
        {
          path: ERoutes.BATTLESHIP_ID,
          element: (
            <ProtectedRouteWithAuth>
              <BattleShip />
            </ProtectedRouteWithAuth>
          )
        },
        {
          path: ERoutes.REGISTRATION,
          element: <SignUp />
        },
        {
          path: ERoutes.LOGIN,
          element: <SignIn />
        },
        {
          path: ERoutes.PROFILE,
          element: (
            <ProtectedRouteWithAuth>
              <ProfileLayout />
            </ProtectedRouteWithAuth>
          ),
          children: [
            {
              index: true,
              element: <Profile />
            },
            {
              path: ERoutes.PROFILE_STATISTICS,
              element: <ProfileStatistics />
            }
          ]
        }
      ]
    }
  ],
  {
    basename: '/gamelandia'
  }
);
