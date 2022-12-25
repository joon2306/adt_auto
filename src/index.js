import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import AppsComponent from './components/AppsComponent/AppsComponent';
import Token from './components/TokenComponent/Token';

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
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
}else{
  ReactDOM.render(
    <React.StrictMode>
    <HashRouter>
        <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Token/>}/>
          <Route path="/apps*" element={<AppsComponent/>}/>
        </Route>
        </Routes>   
      </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );

}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
