// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://backend:3000';

console.log('Using API URL:', API_URL); // For debugging

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