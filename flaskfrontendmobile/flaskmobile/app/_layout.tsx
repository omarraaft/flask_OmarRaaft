import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

export default function App() {
  const [inputs, setInputs] = useState(['', '', '', '']);
  const [result, setResult] = useState<number | null>(null);

  const updateInput = (text: string, index: number) => {
    const updated = [...inputs];
    updated[index] = text;
    setInputs(updated);
  };

  const predict = async () => {
    const values = inputs.map(Number);
    if (values.some(isNaN)) return Alert.alert('Enter all 4 valid numbers');

    try {
      const res = await fetch('http://172.20.10.12:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feature_array: values }),
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data.prediction[0]);
    } catch {
      Alert.alert('Error fetching prediction');
    }
  };

  const species = [
    {
      name: 'Iris Setosa',
      image: require('../assets/images/Irissetosa.jpg'),
    },
    {
      name: 'Iris Versicolour',
      image: require('../assets/images/Irisversicolor.jpg'),
    },
    {
      name: 'Iris Virginica',
      image: require('../assets/images/Irisvirginica.jpg'),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Iris Flower Predictor</Text>
        {inputs.map((val, i) => (
          <TextInput
            key={i}
            style={styles.input}
            keyboardType="numeric"
            placeholder={`Feature ${i + 1}`}
            value={val}
            onChangeText={text => updateInput(text, i)}
            placeholderTextColor="#888"
          />
        ))}

        <TouchableOpacity style={styles.button} onPress={predict}>
          <Text style={styles.buttonText}>Predict</Text>
        </TouchableOpacity>

        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Prediction: {species[result].name}</Text>
            <Image source={species[result].image} style={styles.image} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F2FA',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5D3FBF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#C4AEEE',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#F0E9FF',
    color: '#333',
  },
  button: {
    backgroundColor: '#7C4DFF',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '500',
  },
  resultContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5D3FBF',
    marginBottom: 12,
  },
  image: {
    width: 260,
    height: 180,
    borderRadius: 12,
    resizeMode: 'cover',
  },
});
