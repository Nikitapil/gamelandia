import { RouterProvider } from 'react-router-dom';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthActions } from '../auth/hooks/useAuthActions';
import { router } from '../router/router';

function App() {
  const { refresh } = useAuthActions();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <RouterProvider router={router} />;
}

export default App;
