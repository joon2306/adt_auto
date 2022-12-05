import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppsComponent from './components/AppsComponent.js/AppsComponent';
import Token from './components/Token';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Token/>}/>
        <Route path="/apps*" element={<AppsComponent/>}/>
      </Route>
      </Routes>   
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
