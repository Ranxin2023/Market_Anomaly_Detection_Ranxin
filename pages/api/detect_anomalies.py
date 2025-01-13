import os
import pandas as pd
from sklearn.ensemble import IsolationForest
import json
import sys
# Construct the absolute path to the CSV file
file_path = os.path.join(os.path.dirname(__file__), "../../datasets/FinancialMarketData.csv")
features = json.loads(sys.argv[1])  # Parse features as a list
try:
    # Load the CSV file
    data = pd.read_csv(file_path, header=5)
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
# Generate anomaly predictions for all rows in the dataset
anomalies = model.predict(numerical_data)[0]  # This generates a prediction (-1 or 1) for each row
is_anomaly_flags = anomalies == -1  # Convert to boolean values (True if -1, else False)


# Generate results for each column
results = []

for col in columns_to_use:  # Iterate over the selected columns
    # print(f'column: {col}')
    column_data = numerical_data[[col]]  # Extract the column as a DataFrame
    
    # Train an IsolationForest model for the column
    model = IsolationForest(n_estimators=100, contamination=0.05, random_state=42)
    model.fit(column_data)
    
    # Predict anomalies for the column
    column_anomalies = model.predict(column_data)  # -1 for anomaly, 1 for normal
    # print(f"column anomalies{column_anomalies}")
    anomaly_indices=[]
    for i, anomaly in enumerate(column_anomalies):
        if anomaly==-1:
            anomaly_indices.append(i)
    # Generate results for the column
    column_result = {
        "column": col,
        # "data": column_data[col].tolist(),
        "isAnomaly":  len(anomaly_indices) > 0,
        "strategy": 
            (
        f"We recommend reviewing the following rows for potential issues: {', '.join(map(str, anomaly_indices))}. Consider reevaluating your investment strategy and mitigating risks in these areas."
        if anomaly_indices
        else "No anomalies detected. You can continue optimizing your investment strategy for returns."
    ),
    }
    
    results.append(column_result)

# Output the results as JSON
print(json.dumps(results, indent=2))

