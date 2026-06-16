from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)

# Allow only specific origins (example: 'http://yourfrontend.com')
CORS(app, resources={r"/predict": {"origins": "*"}})

# Load the trained model
try:
    model = joblib.load('severity_model.pkl')
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500

    try:
        data = request.get_json()

        # Check if 'symptoms' are provided in the request
        if not data or 'symptoms' not in data:
            return jsonify({'error': 'Symptoms data not provided'}), 400

        # Validate symptoms data (assuming it should be a list of numbers)
        symptoms = data['symptoms']
        if not isinstance(symptoms, list) or not all(isinstance(i, (int, float)) for i in symptoms):
            return jsonify({'error': 'Symptoms data must be a list of numbers'}), 400

        symptom_data = np.array(symptoms).reshape(1, -1)
        prediction = model.predict(symptom_data)

        # Return severity prediction in a structured response
        return jsonify({'severity': int(prediction[0])})  # Return as an integer if suitable

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
