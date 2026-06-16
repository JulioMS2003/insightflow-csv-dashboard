import { useEffect, useState } from 'react';
import './App.css';
import { getBackendHealth } from './services/api.js';

function App() {
  const [status, setStatus] = useState('Checking API health...');

  useEffect(() => {
    async function checkBackend() {
      try{
      const data = await getBackendHealth();
      setStatus(data.status);
      }
      catch(error){
        console.error(error);
        setStatus('offline');
      }
    }
    checkBackend();
  }, []);

  return (
    <main>
    <h1> InsightFlow </h1>
    <p> Backend status : {status}</p>
    </main>
  );
}

export default App
