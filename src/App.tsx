import { Route, Routes } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
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
import { appSelector } from './redux/appStore/appSelectors';
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

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app);
function App() {
  const [user] = useAuthState(auth);
  const { notification } = useTypedSelector(appSelector);
  return (
    <div className="App">
      <AppHeader auth={auth} />
      <main className="main">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/match-match" element={<MatchMatch />} />
          <Route path="/flappy" element={<FlappyBird auth={auth} />} />
          <Route path="/chess" element={<ChessTypes />} />
          <Route path="/chess/offline" element={<Chess />} />
          <Route path="/aim-game" element={<AimGame auth={auth} />} />
          <Route path="/2048" element={<NumbersGame auth={auth} />} />
          <Route
            path="/chess/rooms"
            element={<ChessRooms auth={auth} firestore={firestore} />}
          />
          <Route
            path="/chess/rooms/:id"
            element={<ChessOnline auth={auth} firestore={firestore} />}
          />
          <Route path="/tictac" element={<TicTacToe />} />
          <Route path="/snake" element={<Snake auth={auth} />} />
          <Route
            path="/battleship"
            element={<BattleShipRooms firestore={firestore} auth={auth} />}
          />
          <Route path="/invaders" element={<CloneInvaders auth={auth} />} />
          <Route path="/tetris" element={<Tetris auth={auth} />} />
          <Route
            path="/battleship/:id"
            element={<BattleShip auth={auth} firestore={firestore} />}
          />
          {!user && (
            <Route path="/registration" element={<SignUp auth={auth} />} />
          )}
          {!user && <Route path="/login" element={<SignIn auth={auth} />} />}
        </Routes>
        {notification.message && <Notification />}
      </main>
    </div>
  );
}

export default App;
