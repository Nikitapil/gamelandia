import { Route, Routes } from 'react-router-dom';
import { AppHeader } from './components/AppHeader/AppHeader';
import { MainPage } from './Pages/MainPage';
import { MatchMatch } from './Pages/MatchMatch';
import './styles/App.scss';

function App() {
  return (
    <div className="App">
      <AppHeader/>
      <main className='main'>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/match-match' element={<MatchMatch/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
