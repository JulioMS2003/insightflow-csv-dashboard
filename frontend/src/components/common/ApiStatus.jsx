import react from 'react'
import { getBackendHealth } from '../../services/api.js';
import { useEffect, useState } from 'react';

function ApiStatus() {
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
        <>
        <p>API Status : {status}</p>
        </>
    )
}

export default ApiStatus;