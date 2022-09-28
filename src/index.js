import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import Residents from './routes/Residents'
import Resident from './routes/Resident'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Planets from './routes/Planets';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planets/>} />
        <Route path="/:pname/:id/residents" element={<Residents/>}/>
        <Route path=":pname/:id/residents/:rid" element={<Resident/>}/>
      </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
