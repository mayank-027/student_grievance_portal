from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and vectorizer
clf = joblib.load('status_predictor.pkl')
vectorizer = joblib.load('vectorizer.pkl')
@app.route('/predict-status', methods=['POST'])
def predict_status():
    data = request.json
    # Combine the fields as you did during training
    text = (
        data.get('title', '') + ' ' +
        data.get('description', '') + ' ' +
        data.get('category', '') + ' ' +
        data.get('priority', '')
    )
    X_vec = vectorizer.transform([text])
    proba = clf.predict_proba(X_vec)[0][1]  # Probability of being resolved

    # You can return a label based on probability
    if proba > 0.8:
        label = "High chance of resolution"
    elif proba > 0.5:
        label = "Moderate chance of resolution"
    else:
        label = "Low chance of resolution"

    return jsonify({
        'probability': float(proba),
        'prediction': label
    })

@app.route('/trending-keywords', methods=['GET'])
def trending_keywords():
    df = pd.read_csv('trending_keywords.csv')
    keywords = df['keyword'].tolist()
    return jsonify({'keywords': keywords})

if __name__ == '__main__':
    app.run(port=5002)