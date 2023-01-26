import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/pages/login'
import 'semantic-ui-css/semantic.min.css'
import './components/styles/stylesheet/styles.css'
import { Router, RouterProvider } from 'react-router-dom'
import Routers from './router/Router'
import './components/styles/stylesheet/resp-animations.css'
import { auth } from './firebase'
import { onAuthStateChanged } from '@firebase/auth'
import { Authstate } from './firebase'

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Authmoment = () => {
  return auth.onAuthStateChanged(user => {
    if (user) {
      
      root.render(<Routers state={true} />)
    } 
    else {
      console.log('no user')
      console.log(Authstate())
      root.render(<Routers state={false} />)
    }
  });
}
Authmoment();
/*ReactDOM.createRoot(document.getElementById('root')).render(
  <Routers state />
)*/
