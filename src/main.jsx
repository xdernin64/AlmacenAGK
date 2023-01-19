import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/pages/login'
import 'semantic-ui-css/semantic.min.css'
import './components/styles/stylesheet/styles.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
