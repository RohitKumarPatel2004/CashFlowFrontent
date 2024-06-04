import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from './Components/Redux-react/Store/UseStore.jsx';
import { InvestmentProvider } from "./Components/Store/InvestmentContext.jsx";
import { AuthProvider } from "./Components/Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <InvestmentProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </InvestmentProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
