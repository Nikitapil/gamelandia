import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Suspense } from "react";
import { RoundLoader } from "./components/UI/Loaders/RoundLoader";
import './i18n'
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Suspense fallback={<RoundLoader/>}>
    <Provider store={store}>
      <BrowserRouter basename="/gamelandia">
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
