import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("SI das IA's: Inicializando árvore de componentes...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("ERRO: Elemento #root não encontrado no DOM.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}