import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ScheduleContextProvider } from './context/ScheduleContext'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ScheduleContextProvider>
    <App />
    </ScheduleContextProvider>
  </React.StrictMode>
);




 