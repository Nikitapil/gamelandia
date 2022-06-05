import { Route, Routes } from "react-router-dom";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Chess } from "./Pages/Chess";
import { MainPage } from "./Pages/MainPage";
import { MatchMatch } from "./Pages/MatchMatch";
import { TicTacToe } from "./Pages/TicTacToe";
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/match-match" element={<MatchMatch />} />
          <Route path="/chess" element={<Chess />} />
          <Route path="/tictac" element={<TicTacToe />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
