from pydantic import BaseModel

class PredictionInput(BaseModel):
    age: int
    # 0 for male, 1 for female
    gender: int 
    blood_pressure: int
    cholesterol: int
    max_heart_rate: int
    insulin: float
    bmi: float
