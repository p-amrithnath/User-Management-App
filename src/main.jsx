import { StrictMode, useLocation } from "react";
import { createRoot } from "react-dom/client";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import Layout from "./layout.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Layout />
        <ToastContainer />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);


