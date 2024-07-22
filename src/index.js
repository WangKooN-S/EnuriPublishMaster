import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/common.css';
import './css/style.css';
import Loader from './loader';
import App from './App';
import reportWebVitals from './reportWebVitals';

const wrap = ReactDOM.createRoot(document.getElementById('wrap'));
wrap.render(
  <React.StrictMode>
    <Loader />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
