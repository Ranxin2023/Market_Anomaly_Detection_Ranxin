import os
import pandas as pd
from sklearn.ensemble import IsolationForest
import json
import sys
# Construct the absolute path to the CSV file
file_path = os.path.join(os.path.dirname(__file__), "../../datasets/Financial_Distress.csv")
features = json.loads(sys.argv[1])  # Parse features as a list
try:
    # Load the CSV file
    data = pd.read_csv(file_path)
    # print(data.head())  # Display the first few rows
except FileNotFoundError:
    print({"error": f"File not found: {file_path}"})
    exit(1)
except Exception as e:
    print({"error": f"Error loading file: {e}"})
    exit(1)
# print(f"The head of data is:{data.head()}")
# print(f"The info of data is:{data.info()}")
# Proceed with your data processing
# columns_to_use = data.columns[5:]  # Adjust based on your CSV file
columns_to_use=[col for col in features if col in data.columns]
# columns_to_use=["x1", "x5", "x9"]
numerical_data = data[columns_to_use].dropna()

# Fit the Isolation Forest model
model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
model.fit(numerical_data)

# Example: Predict for a single input
sample_features = pd.DataFrame([numerical_data.iloc[0].values], columns=columns_to_use)

# Predict using the IsolationForest model
prediction = model.predict(sample_features)[0]
is_anomaly = prediction == -1

# Generate a result
result = {
    "isAnomaly": bool(is_anomaly),
    "strategy": "Reduce risk exposure" if is_anomaly else "Optimize for returns",
}
# result_json=json.dumps(result)
# print(f"result in python is{result_json}")
print(json.dumps(result))
