import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchLogs, createLog } from './api'

function App() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState([])
  const [newLogMessage, setNewLogMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadLogs = async () => {
    try {
      setIsLoading(true);
      const logsData = await fetchLogs();
      setLogs(logsData);
    } catch (error) {
      console.error("Failed to load logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleCreateLog = async (e) => {
    e.preventDefault();
    if (!newLogMessage.trim()) return;
    
    try {
      setIsLoading(true);
      await createLog(newLogMessage);
      setNewLogMessage('');
      // Reload logs after creating new one
      await loadLogs();
    } catch (error) {
      console.error("Failed to create log:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Docker</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <div className="logs-section">
        <h2>System Logs</h2>
        
        <form onSubmit={handleCreateLog} className="log-form">
          <input
            type="text"
            value={newLogMessage}
            onChange={(e) => setNewLogMessage(e.target.value)}
            placeholder="Enter a log message..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !newLogMessage.trim()}>
            {isLoading ? 'Creating...' : 'Create Log'}
          </button>
        </form>
        
        {isLoading && <p>Loading...</p>}
        
        {logs.length === 0 && !isLoading ? (
          <p>No logs found. Create a new log or visit the root endpoint.</p>
        ) : (
          <ul className="logs-list">
            {logs.map((log) => (
              <li key={log._id} className="log-item">
                <span className="log-time">{new Date(log.timestamp).toLocaleString()}</span>:&nbsp;
                <span className="log-message">{log.message}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default App