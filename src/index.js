import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
// import { ColorThemeProvider } from './context/ColorThemeContext';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      {/* <ColorThemeProvider > */}
        <App />
      {/* </ColorThemeProvider> */}
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);