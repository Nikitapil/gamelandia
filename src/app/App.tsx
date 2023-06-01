import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { AppHeader } from './components/AppHeader/AppHeader';
import { BattleShip } from '../games/battleship/pages/BattleShip';
import { Chess } from '../games/chess/pages/Chess';
import { MainPage } from '../main/pages/MainPage';
import { MatchMatch } from '../games/match-match/pages/MatchMatch';
import { Snake } from '../games/snake/pages/Snake';
import { TicTacToe } from '../games/tic-tac-toe/pages/TicTacToe';
import { SignUp } from '../auth/pages/SignUp';
import { SignIn } from '../auth/pages/SignIn';
import { BattleShipRooms } from '../games/battleship/pages/BattleShipRooms';
import { ChessTypes } from '../games/chess/pages/ChessTypes';
import { ChessRooms } from '../games/chess/pages/ChessRooms';
import { ChessOnline } from '../games/chess/pages/ChessOnline';
import { Breadcrumbs } from './components/Breadcrumbs/Breadcrumbs';
import { CloneInvaders } from '../games/clone-invaders/pages/CloneInvaders';
import { Tetris } from '../games/tetris/pages/Tetris';
import { FlappyBird } from '../games/flappy/pages/FlappyBird';
import { AimGame } from '../games/aim/pages/AimGame';
import { NotFound } from './pages/NotFound/NotFound';
import { NumbersGame } from '../games/2048/pages/NumbersGame';
import { ERoutes } from '../constants/routes';
import { Solitaire } from '../games/solitaire/pages/Solitaire';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthActions } from '../auth/hooks/useAuthActions';
import { LanguageDropdown } from './components/LanguageDropdown/LanguageDropdown';
import styles from './assets/styles/app-styles.module.scss';

function App() {
  const { refresh } = useAuthActions();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <div className={styles.breadcrumbs}>
          <Breadcrumbs />
          <LanguageDropdown />
        </div>
        <Routes>
          <Route
            path={ERoutes.MAIN}
            element={<MainPage />}
          />
          <Route
            path={ERoutes.UNKNOWN}
            element={<NotFound />}
          />
          <Route
            path={ERoutes.MATCH_MATCH}
            element={<MatchMatch />}
          />
          <Route
            path={ERoutes.FLAPPY}
            element={<FlappyBird />}
          />
          <Route
            path={ERoutes.CHESS}
            element={<ChessTypes />}
          />
          <Route
            path={ERoutes.CHESS_OFFLINE}
            element={<Chess />}
          />
          <Route
            path={ERoutes.AIM_GAME}
            element={<AimGame />}
          />
          <Route
            path={ERoutes.NUMBERS}
            element={<NumbersGame />}
          />
          <Route
            path={ERoutes.SOLITAIRE}
            element={<Solitaire />}
          />
          <Route
            path={ERoutes.CHESS_ROOMS}
            element={<ChessRooms />}
          />
          <Route
            path={ERoutes.CHESS_ROOMS_ID}
            element={<ChessOnline />}
          />
          <Route
            path={ERoutes.TIC_TAC}
            element={<TicTacToe />}
          />
          <Route
            path={ERoutes.SNAKE}
            element={<Snake />}
          />
          <Route
            path={ERoutes.BATTLESHIP}
            element={<BattleShipRooms />}
          />
          <Route
            path={ERoutes.INVADERS}
            element={<CloneInvaders />}
          />
          <Route
            path={ERoutes.TETRIS}
            element={<Tetris />}
          />
          <Route
            path={ERoutes.BATTLESHIP_ID}
            element={<BattleShip />}
          />
          <Route
            path={ERoutes.REGISTRATION}
            element={<SignUp />}
          />
          <Route
            path={ERoutes.LOGIN}
            element={<SignIn />}
          />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
      </main>
    </div>
  );
}

export default App;
