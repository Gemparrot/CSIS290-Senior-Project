import joblib
import pandas as pd

# Load the model
model = joblib.load('./model/random_forest_model.pkl')

# Test data
data = pd.DataFrame([{
    "age": 30,
    "gender": 0,
    "blood pressure": 120,
    "cholesterol": 200,
    "max heart rate": 170,
    "insulin": 15.0,
    "bmi": 25.0
}])

# Make prediction
print("Prediction:", model.predict(data))
