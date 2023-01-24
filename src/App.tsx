import { Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { AppHeader } from './components/AppHeader/AppHeader';
import { firebaseConfig } from './fbconfig';
import { BattleShip } from './Pages/BattleShip';
import { Chess } from './Pages/Chess';
import { MainPage } from './Pages/MainPage';
import { MatchMatch } from './Pages/MatchMatch';
import { Snake } from './Pages/Snake';
import { TicTacToe } from './Pages/TicTacToe';
import './styles/App.scss';
import { SignUp } from './Pages/SignUp';
import { SignIn } from './Pages/SignIn';
import { Notification } from './components/UI/Notification';
import { useTypedSelector } from './hooks/useTypedSelector';
import { appSelector } from './redux/appStore/app-selectors';
import { BattleShipRooms } from './Pages/BattleShipRooms';
import { ChessTypes } from './Pages/ChessTypes';
import { ChessRooms } from './Pages/ChessRooms';
import { ChessOnline } from './Pages/ChessOnline';
import { Breadcrumbs } from './components/UI/Breadcrumbs';
import { CloneInvaders } from './Pages/CloneInvaders';
import { Tetris } from './Pages/Tetris';
import { FlappyBird } from './Pages/FlappyBird';
import { AimGame } from './Pages/AimGame';
import { NotFound } from './Pages/NotFound';
import { NumbersGame } from './Pages/NumbersGame';
import { ERoutes } from './constants/routes';

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
function App() {
  const { notification } = useTypedSelector(appSelector);
  return (
    <div className="App">
      <AppHeader auth={auth} />
      <main className="main">
        <Breadcrumbs />
        <Routes>
          <Route path={ERoutes.MAIN} element={<MainPage />} />
          <Route path={ERoutes.UNKNOWN} element={<NotFound />} />
          <Route path={ERoutes.MATCH_MATCH} element={<MatchMatch />} />
          <Route path={ERoutes.FLAPPY} element={<FlappyBird auth={auth} />} />
          <Route path={ERoutes.CHESS} element={<ChessTypes />} />
          <Route path={ERoutes.CHESS_OFFLINE} element={<Chess />} />
          <Route path={ERoutes.AIM_GAME} element={<AimGame auth={auth} />} />
          <Route path={ERoutes.NUMBERS} element={<NumbersGame auth={auth} />} />
          <Route
            path={ERoutes.CHESS_ROOMS}
            element={<ChessRooms auth={auth} firestore={firestore} />}
          />
          <Route
            path={ERoutes.CHESS_ROOMS_ID}
            element={<ChessOnline auth={auth} firestore={firestore} />}
          />
          <Route path={ERoutes.TIC_TAC} element={<TicTacToe />} />
          <Route path={ERoutes.SNAKE} element={<Snake auth={auth} />} />
          <Route
            path={ERoutes.BATTLESHIP}
            element={<BattleShipRooms firestore={firestore} auth={auth} />}
          />
          <Route
            path={ERoutes.INVADERS}
            element={<CloneInvaders auth={auth} />}
          />
          <Route path={ERoutes.TETRIS} element={<Tetris auth={auth} />} />
          <Route
            path={ERoutes.BATTLESHIP_ID}
            element={<BattleShip auth={auth} firestore={firestore} />}
          />

          <Route path={ERoutes.REGISTRATION} element={<SignUp auth={auth} />} />
          <Route path={ERoutes.LOGIN} element={<SignIn auth={auth} />} />
        </Routes>
        {notification.message && <Notification />}
      </main>
    </div>
  );
}

export default App;
