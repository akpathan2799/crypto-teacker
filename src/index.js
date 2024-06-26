import React from 'react';
import ReactDOM from 'react-dom/client';
import {lazy} from 'react';
import './index.css';
import Layout from './Layout';
import reportWebVitals from './reportWebVitals';
import{RouterProvider, createBrowserRouter} from 'react-router-dom'
// import HomePage from './Components/Homepage/HomePage';
// import CoinPage from './Components/CoinPage/CoinPage';

const HomePage = lazy(()=> import('./Components/Homepage/HomePage'))
const CoinPage = lazy(()=> import('./Components/CoinPage/CoinPage'))


const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/coin/:coinId',
        element:<CoinPage/>
      }
    ]
  }
]);
root.render(
  <React.StrictMode> 
  <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
