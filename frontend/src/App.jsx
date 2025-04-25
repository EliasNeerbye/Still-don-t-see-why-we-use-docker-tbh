// frontend/src/App.jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { fetchLogs } from './api'

function App() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const getLogs = async () => {
      const logsData = await fetchLogs();
      setLogs(logsData);
    };
    getLogs();
  }, []);

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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <div className="logs">
        <h2>Recent Logs</h2>
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              {new Date(log.timestamp).toLocaleString()}: {log.message}
            </li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App