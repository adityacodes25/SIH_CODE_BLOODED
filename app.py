from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app) # Enable CORS so Express/React can call this API

# Load trained model and feature structure
MODEL_PATH = 'ML/saved_models/placement_model.pkl'
FEATURES_PATH = 'ML/saved_models/model_features.pkl'

if not os.path.exists(MODEL_PATH) or not os.path.exists(FEATURES_PATH):
    raise FileNotFoundError("Model files not found. Run train_model.py first!")

model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "service": "SkillTrace ML Engine"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract features from request payload
        attendance = float(data.get('attendance', 0))
        score = float(data.get('assessment_score', 0))
        duration = int(data.get('duration_days', 60))
        sector = data.get('sector', 'IT')
        skill_level = data.get('skill_level', 'Basic')

        # Create input dataframe
        input_data = pd.DataFrame([{
            'Attendance_Percentage': attendance,
            'Assessment_Score': score,
            'Duration_Days': duration,
            'Sector': sector,
            'Skill_Level': skill_level
        }])

        # Perform One-Hot Encoding to match training format
        input_encoded = pd.get_dummies(input_data, columns=['Sector', 'Skill_Level'])
        
        # Align features with training schema (fill missing columns with 0)
        input_aligned = input_encoded.reindex(columns=feature_columns, fill_value=0)

        # Generate prediction and probabilities
        prediction = model.predict(input_aligned)[0]
        probabilities = model.predict_proba(input_aligned)[0]

        placement_probability = round(float(probabilities[1]) * 100, 2)

        return jsonify({
            'success': True,
            'placed': int(prediction),
            'placement_probability': placement_probability,
            'status': 'Placed' if prediction == 1 else 'Not Placed'
        }), 200

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

if __name__ == '__main__':
    print("Starting SkillTrace ML Service on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)