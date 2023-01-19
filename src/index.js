import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import './index.css';
import store from './redux/store';
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        closeOnClick
        theme="light"
        />
        <App/>
      </Provider>
  </React.StrictMode>
  ,

  document.getElementById('root')
);