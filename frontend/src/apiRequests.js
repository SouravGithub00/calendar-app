import { toast } from "react-toastify";

async function apiRequest(url, method = 'GET', data = null, headers = {}) {
    // Default headers
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...headers,
    };
  
    // Request options
    const options = {
      method,
      headers: defaultHeaders,
    };
  
    // Add body data for POST, PUT, DELETE methods
    if (data && (method === 'POST' || method === 'PUT' || method === 'DELETE')) {
      options.body = JSON.stringify(data);
    }
  
    try {
      const response = await fetch(url, options);
  
      // Check if the response is successful
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`${errorMessage.error}`);
      }
  
      // Parse and return JSON response
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error making API request:', error);
      toast.error(error.toString())
      throw error;
    }
  }

  export default apiRequest;
  
  