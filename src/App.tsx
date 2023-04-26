import { Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { AppHeader } from './components/AppHeader/AppHeader';
import { firebaseConfig } from './fbconfig';
import { BattleShip } from './pages/BattleShip';
import { Chess } from './pages/Chess';
import { MainPage } from './pages/MainPage';
import { MatchMatch } from './pages/MatchMatch';
import { Snake } from './pages/Snake';
import { TicTacToe } from './pages/TicTacToe';
import './styles/App.scss';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import { BattleShipRooms } from './pages/BattleShipRooms';
import { ChessTypes } from './pages/ChessTypes';
import { ChessRooms } from './pages/ChessRooms';
import { ChessOnline } from './pages/ChessOnline';
import { Breadcrumbs } from './components/UI/Breadcrumbs';
import { CloneInvaders } from './pages/CloneInvaders';
import { Tetris } from './pages/Tetris';
import { FlappyBird } from './pages/FlappyBird';
import { AimGame } from './pages/AimGame';
import { NotFound } from './pages/NotFound';
import { NumbersGame } from './pages/NumbersGame';
import { ERoutes } from './constants/routes';
import { Solitaire } from './pages/Solitaire';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthActions } from './auth/hooks/useAuthActions';

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
function App() {
  const { refresh } = useAuthActions();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <Breadcrumbs />
        <Routes>
          <Route path={ERoutes.MAIN} element={<MainPage />} />
          <Route path={ERoutes.UNKNOWN} element={<NotFound />} />
          <Route path={ERoutes.MATCH_MATCH} element={<MatchMatch />} />
          <Route path={ERoutes.FLAPPY} element={<FlappyBird />} />
          <Route path={ERoutes.CHESS} element={<ChessTypes />} />
          <Route path={ERoutes.CHESS_OFFLINE} element={<Chess />} />
          <Route path={ERoutes.AIM_GAME} element={<AimGame />} />
          <Route path={ERoutes.NUMBERS} element={<NumbersGame />} />
          <Route path={ERoutes.SOLITAIRE} element={<Solitaire />} />
          <Route
            path={ERoutes.CHESS_ROOMS}
            element={<ChessRooms firestore={firestore} />}
          />
          <Route
            path={ERoutes.CHESS_ROOMS_ID}
            element={<ChessOnline firestore={firestore} />}
          />
          <Route path={ERoutes.TIC_TAC} element={<TicTacToe />} />
          <Route path={ERoutes.SNAKE} element={<Snake />} />
          <Route
            path={ERoutes.BATTLESHIP}
            element={<BattleShipRooms firestore={firestore} />}
          />
          <Route path={ERoutes.INVADERS} element={<CloneInvaders />} />
          <Route path={ERoutes.TETRIS} element={<Tetris />} />
          <Route
            path={ERoutes.BATTLESHIP_ID}
            element={<BattleShip firestore={firestore} />}
          />

          <Route path={ERoutes.REGISTRATION} element={<SignUp />} />
          <Route path={ERoutes.LOGIN} element={<SignIn />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={2000} />
      </main>
    </div>
  );
}

export default App;
