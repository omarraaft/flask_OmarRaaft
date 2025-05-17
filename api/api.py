import pickle
import flask
from flask import request
from flask_cors import CORS  # ✅ Allow cross-origin requests
from sklearn.linear_model import LogisticRegression

app = flask.Flask(__name__)
CORS(app)  # ✅ Enable CORS for all routes

# Load our trained model from a file we created earlier
with open("iris_model.pkl", 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    # Get features from JSON request
    feature_array = request.get_json()['feature_array']

    # Predict using the loaded model
    prediction = model.predict([feature_array]).tolist()

    # Return the prediction as JSON
    return flask.jsonify({'prediction': prediction})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')
