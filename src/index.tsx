import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import App from './app/App';
import { RoundLoader } from './components/UI/Loaders/RoundLoader';
import './i18n';
import './assets/styles/index.scss';
import { store } from './store';
import { FirebaseProvider } from './context/firebase-context/FirebaseContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Suspense fallback={<RoundLoader />}>
    <Provider store={store}>
      <FirebaseProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={2000}
        />
      </FirebaseProvider>
    </Provider>
  </Suspense>
);
