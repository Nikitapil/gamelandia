import { Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { firebaseConfig } from "./fbconfig";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { BattleShip } from "./Pages/BattleShip";
import { Chess } from "./Pages/Chess";
import { MainPage } from "./Pages/MainPage";
import { MatchMatch } from "./Pages/MatchMatch";
import { Snake } from "./Pages/Snake";
import { TicTacToe } from "./Pages/TicTacToe";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "./styles/App.scss";
import { SignUp } from "./Pages/SignUp";
import { SignIn } from "./Pages/SignIn";
import { Notification } from "./components/UI/Notification";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { appSelector } from "./redux/appStore/appSelectors";
import { BattleShipRooms } from "./Pages/BattleShipRooms";

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
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<MainPage />} />
          <Route path="/match-match" element={<MatchMatch />} />
          <Route path="/chess" element={<Chess />} />
          <Route path="/tictac" element={<TicTacToe />} />
          <Route path="/snake" element={<Snake auth={auth} />} />
          <Route
            path="/battleship"
            element={<BattleShipRooms firestore={firestore} auth={auth} />}
          />
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
