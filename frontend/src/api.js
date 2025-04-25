// frontend/src/api.js
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000' 
  : 'http://backend:3000';

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