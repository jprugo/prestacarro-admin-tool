import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/App';
import Login from './views/Login';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Layout from 'antd/lib/layout/layout';

import 'antd/dist/antd.min.css';


ReactDOM.render(
  <React.StrictMode>

    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
