import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState({
    feature1: '',
    feature2: '',
    feature3: '',
    feature4: '',
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featureArray = Object.values(inputs).map(Number);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature_array: featureArray }),
      });

      const data = await response.json();
      setPrediction(data.prediction[0]);
    } catch (error) {
      console.error('Error:', error);
      setPrediction('error');
    }
  }

  const speciesInfo = {
    0: { name: 'Iris Setosa', image: '/irissetosa.jpg' },
    1: { name: 'Iris Versicolour', image: '/irisversicolor.jpg' },
    2: { name: 'Iris Virginica', image: '/irisvirginica.jpg' },
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f0f4f8, #d9e2ec);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .App {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        h1 {
          color: #2f3e46;
          margin-bottom: 1.5rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        input[type='number'] {
          padding: 0.75rem;
          border: 2px solid #ccd6dd;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.3s ease;
          background-color: #f8fafc;
        }

        input[type='number']:focus {
          border-color: #0077b6;
          outline: none;
          background-color: #ffffff;
        }

        button {
          padding: 0.75rem;
          background-color: #0077b6;
          color: white;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #023e8a;
        }

        .result {
          margin-top: 2rem;
        }

        .result img {
          width: 100%;
          max-width: 300px;
          border-radius: 12px;
          margin-top: 1rem;
        }

        h2 {
          color: #1d3557;
        }
      `}</style>

      <div className="App">
        <h1>Iris Flower Predictor</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="any"
            name="feature1"
            placeholder="Feature 1"
            value={inputs.feature1}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature2"
            placeholder="Feature 2"
            value={inputs.feature2}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature3"
            placeholder="Feature 3"
            value={inputs.feature3}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature4"
            placeholder="Feature 4"
            value={inputs.feature4}
            onChange={handleChange}
            required
          />
          <button type="submit">Predict</button>
        </form>

        {prediction !== null && prediction !== 'error' && (
          <div className="result">
            <h2>Prediction: {speciesInfo[prediction].name}</h2>
            <img src={speciesInfo[prediction].image} alt={speciesInfo[prediction].name} />
          </div>
        )}

        {prediction === 'error' && (
          <div className="result">
            <h2 style={{ color: 'red' }}>Error getting prediction</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
