import React from 'react';
import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import Weather from './clima';
import { getCity } from './ciudades';



function App() {
  const login = ()=>{
    signInAnonymously(getAuth()).then(usuario=> console.log
      (usuario));
   }
   const activarMensajes = async ()=>{
    const token = await getToken(messaging, {
      vapidKey:"BF0SSv51Lc9fQZxSdFq5kdPJmG9Xgmx5VxpV2Q-6gyLnK2a4PjVIJUIY54V63unHBmODW0X0aT-TkP9PGPqyKDk"
    }).catch(error => console.log("error al generar el token paps"));
  
    if(token) console.log("Este es tu token: "+ token);
    if(!token) console.log("No tienes token paps")
  }
  


  React.useEffect(() => {
    onMessage(messaging, message => {
      console.log("Tu mensaje: ", message);
      toast(message.notification.title);
    })

  }, []);

  return (
    <div>
      <h1>Hola mundo</h1>
      <ToastContainer />
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={login} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Logearse</button>
        <button onClick={activarMensajes} style={{ backgroundColor: '#008CBA', color: 'white', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Generar token</button>
      </div>
      <Weather city={getCity()} />
    </div>
  );
}

export default App;
