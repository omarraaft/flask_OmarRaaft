import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [result, setResult] = useState(null);

  const handleChange = (value: string, index: number) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const handlePredict = async () => {
    const feature_array = inputs.map(num => parseFloat(num));

    if (feature_array.some(isNaN)) {
      Alert.alert('Invalid input', 'Please enter all 4 valid numbers');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.14:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature_array }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data.prediction[0]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch prediction');
      console.error('Fetch error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ML Prediction (4 Inputs)</Text>

      {inputs.map((val, idx) => (
        <TextInput
          key={idx}
          style={styles.input}
          keyboardType="numeric"
          placeholder={`Input ${idx + 1}`}
          value={val}
          onChangeText={text => handleChange(text, idx)}
        />
      ))}

      <Button title="Predict" onPress={handlePredict} />

      {result !== null && (
        <Text style={styles.result}>Prediction: {result}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
