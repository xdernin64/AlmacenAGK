import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './components/styles/stylesheet/styles.css'
import Routers from './router/Router'
import './components/styles/stylesheet/resp-animations.css'
import { auth } from './firebase'
import { Authstate } from './firebase'

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Authmoment = () => {

  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = -scrollPosition/2 + "px";
  }
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
