// Use the current hostname with the backend port
const API_URL = `http://${window.location.hostname}:3000`;

console.log('Using API URL:', API_URL);

export const fetchLogs = async () => {
  try {
    const response = await fetch(`${API_URL}/logs`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching logs:', error);
    return [];
  }
};

export const createLog = async (message) => {
  try {
    const response = await fetch(`${API_URL}/logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating log:', error);
    throw error;
  }
};