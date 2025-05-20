import React, { useState } from 'react';

const BACKEND_URL = 'http://172.20.10.12:5000';

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
      const response = await fetch(`${BACKEND_URL}/predict`, {
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
  };

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
          background: linear-gradient(135deg, #7F55B1, #9B7EBD);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }

        .App {
          background: #ffffff;
          padding: 3rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(127, 85, 177, 0.3);
          max-width: 420px;
          width: 100%;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }

        .App:hover {
          box-shadow: 0 30px 60px rgba(127, 85, 177, 0.4);
        }

        h1 {
          color: #6C3DB5;
          margin-bottom: 2rem;
          font-size: 1.8rem;
          letter-spacing: 0.5px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        input[type='number'] {
          padding: 0.8rem;
          border: 2px solid #B799DD;
          border-radius: 10px;
          font-size: 1rem;
          background-color: #FAE6F2;
          color: #4a3b56;
          transition: 0.3s ease;
        }

        input[type='number']:focus {
          border-color: #F49BAB;
          background-color: #fff;
          outline: none;
        }

        button {
          padding: 0.85rem;
          background-color: #7F55B1;
          color: white;
          font-size: 1.05rem;
          font-weight: 500;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #9B7EBD;
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
          color: #6C3DB5;
          margin-bottom: 0.5rem;
        }

        @media (max-width: 480px) {
          .App {
            margin: 1rem;
            padding: 2rem;
            max-width: 100%;
            box-shadow: none;
          }

          h1 {
            font-size: 1.5rem;
          }

          button {
            font-size: 1rem;
          }

          input[type='number'] {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="App">
        <h1>Iris Flower Predictor</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            step="any"
            name="feature1"
            placeholder="Sepal Length (cm)"
            value={inputs.feature1}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature2"
            placeholder="Sepal Width (cm)"
            value={inputs.feature2}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature3"
            placeholder="Petal Length (cm)"
            value={inputs.feature3}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            step="any"
            name="feature4"
            placeholder="Petal Width (cm)"
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
            <h2 style={{ color: '#F49BAB' }}>Error getting prediction</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
