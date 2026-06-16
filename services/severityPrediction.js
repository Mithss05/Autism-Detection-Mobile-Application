import axios from 'axios';

const predictSeverity = async (symptomData) => {
  try {
    const response = await axios.post('https://your-production-server.com/predict', 
    // {
      {
      symptoms: symptomData
    });
    console.log('Prediction Response:', response.data);
    return response.data; // Return prediction data for later use
  } catch (error) {
    console.error('Error predicting severity:', error);
  }
};

export default predictSeverity;
