import streamlit as st
import pickle
import numpy as np

st.title("Iris Model Demo")

sepal_length = st.number_input("Sepal Length", min_value=0.0, format="%.2f")
sepal_width = st.number_input("Sepal Width", min_value=0.0, format="%.2f")
petal_length = st.number_input("Petal Length", min_value=0.0, format="%.2f")
petal_width = st.number_input("Petal Width", min_value=0.0, format="%.2f")

@st.cache_resource  # Cache model loading
def load_model():
    with open("iris_model.pkl", "rb") as f:
        model = pickle.load(f)
    return model

model = load_model()

if st.button("Predict"):
    features = np.array([[sepal_length, sepal_width, petal_length, petal_width]])
    prediction = model.predict(features)
    st.write(f"Prediction: {prediction[0]}")
