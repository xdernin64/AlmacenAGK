import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import 'semantic-ui-css/semantic.min.css'
import './components/styles/stylesheet/styles.css'
import Routers from './router/Router'
import './components/styles/stylesheet/resp-animations.css'
import { auth } from './firebase'
import { Authstate } from './firebase'
import 'devextreme/dist/css/dx.light.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Authmoment = () => {
  const handleScroll = () => {
    const scrollPosition = window.pageYOffset;
    document.body.style.backgroundPositionY = -scrollPosition / 2 + "px";
  };
  return auth.onAuthStateChanged((user) => {
    if (user) {
      // Obtener el resultado del token de identidad del usuario
      user.getIdTokenResult().then((idTokenResult) => {
        // Verificar si el usuario tiene el rol de administrador
        const isAdmin = idTokenResult.claims.role === "administrador";
        // Renderizar las rutas con el estado y el rol del usuario
        root.render(<Routers state={true} isAdmin={isAdmin} />);
      });
    } else {
      console.log("no user");
      console.log(Authstate());
      root.render(<Routers state={false} />);
    }
  });
};
Authmoment()

/*ReactDOM.createRoot(document.getElementById('root')).render(
  <Routers state />
)*/
