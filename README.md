# Market Anomaly Detection
## Introduction
This project implements a **Financial Anomaly Detection System** using **unsupervised machine learning** techniques. It is specifically designed to identify irregularities or deviations in financial datasets, which may indicate opportunities for risk mitigation, fraud detection, or system optimization. Anomalies in financial data often refer to instances where the behavior of a financial metric or a set of metrics deviates significantly from historical patterns or expectations. These anomalies can be caused by various factors, such as market fluctuations, irregular transactions, or even systemic errors in financial reporting.

The core of this project uses the **Isolation Forest algorithm**, a powerful unsupervised machine learning method tailored for anomaly detection. Isolation Forest is effective in financial contexts because it excels at isolating anomalies by randomly partitioning data points. Unlike supervised learning methods, which require labeled datasets, the unsupervised approach allows this system to operate effectively without the need for pre-labeled data. This flexibility makes it particularly suitable for dynamic and ever-evolving financial environments.

This project provides an interactive web-based solution built with Next.js, which allows users to upload financial datasets, select specific metrics for analysis, and visualize the results of the anomaly detection. The backend, developed using Node.js, communicates with a Python-based anomaly detection engine through the spawn function to process data and return actionable insights.
## Features
1. **Anomaly Detection**:

Uses the Isolation Forest algorithm, a tree-based, unsupervised machine learning model, to identify anomalies in financial datasets.

Detects irregularities in numerical features of financial transactions.

2. **Unsupervised Learning**:

The Isolation Forest algorithm operates in an unsupervised fashion, meaning it does not require labeled data.

It identifies anomalies by measuring how "isolated" a point is in the feature space, making it ideal for detecting rare or unusual events in datasets.

3. **Dynamic Frontend**:

Built using Next.js, a React framework for server-rendered applications.

Features an intuitive interface where users can input features and view analysis results dynamically.

4. **Backend-Python Integration**:

The backend uses Node.js and leverages the spawn function to run Python scripts that execute the Isolation Forest model.

Results from Python are parsed and returned to the frontend for display.

5. **Testing Framework**:

Employs Jest for unit testing, ensuring robust and reliable backend and frontend functionality.

## Dataset

The dataset used in this project contains financial indicators from various sources, including currency indices, government bond yields, and market volatility indices. Each column represents a financial metric, and each row corresponds to a specific date or financial observation.

### Dataset Preprocessing

The dataset contains metadata and headers in the first 5 rows. These rows are removed during preprocessing to ensure proper analysis.

The actual column names start from the 6th row. This is handled programmatically in the Python script.

Missing values (NaN) are dropped to ensure the IsolationForest model works effectively.

### Example Columns in Dataset

DXY Curncy: US Dollar Index.

JPY Curncy: Japanese Yen Index.

USGG30YR: US 30-Year Treasury Bond Yield.

VIX Index: Market Volatility Index.

GTDEM30: German 30-Year Treasury Bond Yield.

The dataset is preprocessed to ensure compatibility with the anomaly detection model, focusing on key financial indicators that are prone to anomalies.

### Financial Anomaly

A financial anomaly can indicate irregularities such as sudden spikes or drops in financial metrics, deviations from expected trends, or outliers in the dataset. These anomalies are critical for identifying risks, opportunities, or potential errors in financial data. For example:

A sharp increase in the VIX Index may indicate heightened market volatility.

An unexpected drop in bond yields could suggest economic uncertainty.
## Tech Used
1. **Unsupervised Learning** and **Anomalies**

- Unsupervised Learning:

Refers to machine learning tasks where the algorithm is not provided with explicit labels.

The algorithm infers patterns and structures from the data itself.

- Anomaly Detection:

Identifies rare events or data points that deviate significantly from the majority of the data.

Critical in financial applications to flag irregular transactions or market anomalies.
2. **Isolation Forest**

- Concept:

Isolation Forest is an unsupervised learning algorithm specifically designed for anomaly detection.

It isolates anomalies by constructing random decision trees and identifying points that require fewer splits to be isolated.

- Role in the Project:

Used to analyze numerical features in the dataset and detect outliers that represent financial anomalies.

Provides actionable insights, such as recommending "Reduce risk exposure" for anomalous data points.



3. **spawn** Module

Concept:

A Node.js module used to create child processes and execute external commands or scripts.

Provides a way to communicate between Node.js applications and external scripts (e.g., Python).

Role in the Project:

Facilitates the execution of the detect_anomalies.py script from the Node.js backend.

Captures output from the Python script and processes it for the frontend.

4. **Next.js**

- Concept:

A powerful React-based framework that enables server-side rendering and static site generation.

- Role in the Project:

Builds the user interface for anomaly detection.

Handles client-server communication and dynamically updates the analysis results.

5. **Jest**

- Concept:

A JavaScript testing framework designed for simplicity and performance.

- Role in the Project:

Validates backend and frontend functionality.

Ensures the API endpoint correctly processes data, integrates with the Python script, and returns expected results.

## Getting Started

First, run the development server:
1. clone the repository
```sh
https://github.com/Ranxin2023/Market_Anomaly_Detection_Ranxin
```

2. Install dependencies:
```sh
npm install
```
3. Install python packages
```sh
pip install -r requirements.txt
```
4. Run the development server:
```bash
npm run dev

```
5. Run the tests:
```bash
npm test
```
6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Anomaly Documentation](https://medium.com/simform-engineering/anomaly-detection-with-unsupervised-machine-learning-3bcf4c431aff) Anomaly concepts tutorial
- [Anomaly Detection Algorithms](https://builtin.com/machine-learning/anomaly-detection-algorithms)





## Project Structure
```graphql
project/
├── pages/
│   ├── api/
│   │   ├── strategy.ts         # Backend API handling user requests
│   │   ├── detect_anomalies.py # Python script for anomaly detection
├── components/
│   ├── AnalysisResult.tsx      # Component to display analysis results
├── public/
│   ├── assets/                 # Static files
├── tests/
│   ├── api/                    # Jest API tests

```

## How it works
1. Frontend: Accepts user inputs (column names) for anomaly detection.
2. Backend:
- Processes requests and communicates with the Python script.
- Sends responses back to the frontend.
3. Python Script:
- Uses Isolation Forest to analyze the dataset.
- Outputs whether the data contains anomalies and suggests a financial strategy.

## Usage
1. Open the application in your browser.

2. Input the financial features (comma-separated) into the input field.

3. Click "Analyze" to view the anomaly detection results.

4. The results include:

- Status of each column (Anomalous or Normal).

- Suggestions for improvement or risk mitigation for each anomalous column.