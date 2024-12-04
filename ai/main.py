from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Define the input schema
class PredictionInput(BaseModel):
    age: int
    gender: int  # Assume 0 for male, 1 for female
    blood_pressure: int
    cholesterol: int
    max_heart_rate: int
    insulin: float
    bmi: float

# Load the trained Random Forest model
model = joblib.load('./model/random_forest_model.pkl')

app = FastAPI()

@app.get("/")
def home():
    return {"message": "AI server is running."}

@app.post("/predict/")
def predict(input_data: PredictionInput):
    # Log received input
    print("Received input data:", input_data)

    # Convert input data to DataFrame
    data = pd.DataFrame([input_data.dict()])
    print("Data after conversion:", data)

    # Rename columns to match the feature names used during training
    column_mapping = {
        "blood_pressure": "blood pressure",
        "max_heart_rate": "max heart rate"
    }
    data = data.rename(columns=column_mapping)
    print("Data after renaming columns:", data)

    # Ensure the model is being accessed
    try:
        prediction = model.predict(data)
    except Exception as e:
        print("Error during model prediction:", e)
        raise e

    # Map numerical predictions back to triage labels
    triage_labels = {0: "green", 1: "yellow", 2: "orange", 3: "red"}
    predicted_label = triage_labels[prediction[0]]
    print("Prediction result:", predicted_label)

    return {"triage": predicted_label}
