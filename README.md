# Market Anomaly Detection
## Introduction
This project implements a **Financial Anomaly Detection System** using **unsupervised machine learning** techniques. The system is designed to identify irregularities or deviations in financial datasets, which may indicate opportunities for risk mitigation, fraud detection, or optimization. These anomalies, often caused by market fluctuations, irregular transactions, or systemic errors, are crucial for making data-driven decisions in the financial sector.

The core of this project revolves around the Isolation Forest algorithm, Principal Component Analysis (PCA), and Support Vector Machines (SVM). These models are tailored for anomaly detection and dimensionality reduction, making them ideal for identifying and understanding unusual patterns in financial data.

The project features a fully interactive web-based solution built with Next.js and powered by a backend written in Node.js. It integrates seamlessly with a Python-based machine learning engine for high-performance data analysis, allowing users to input datasets, select models, and visualize results dynamically.


## Features
1. **Anomaly Detection**
- **Isolation Forest**:
    - Detects anomalies by isolating data points in the feature space.
    - Suitable for detecting rare or unusual events without labeled data.
- **Support Vector Machine (SVM)**:
    - Identifies anomalies using hyperplanes to separate outliers from normal data points.
    - Useful for datasets with complex patterns.
- **robust Principal Component Analysis (rPCA)**:
    - Separates Data into Components:Decomposes data into low-rank structure (dominant patterns) and sparse components (outliers or anomalies).
    - Handles Outliers Effectively:Identifies anomalies as deviations from the low-rank structure, making it more robust than standard PCA.
    - Highlights Anomalies in Financial Data: Reveals rare events or irregularities while preserving the integrity of the major trends.
    
2. **Dynamic Frontend**
- Built with Next.js, offering:
    - Intuitive interface to select financial metrics and models.
    - Interactive visualizations of analysis results.
    - Real-time updates for anomaly detection.
3. **Python Integration**
- Backend uses **Node.js spawn module** to execute Python scripts:
    - Scripts handle model computation (Isolation Forest, PCA, and SVM).
    - Results are passed back to the frontend for display.
4. **Testing Framework**
- Employs **Jest** for robust backend and frontend testing:
    - Ensures API endpoints correctly process data.
    - Validates Python integration and result accuracy.

## Dataset

The dataset used in this project contains financial indicators from various sources, including currency indices, government bond yields, and market volatility indices. Each column represents a financial metric, and each row corresponds to a specific date or financial observation.

### Dataset Preprocessing

- The dataset contains metadata and headers in the first 5 rows. These rows are removed during preprocessing to ensure proper analysis.

- The actual column names start from the 6th row. This is handled programmatically in the Python script.

- Missing values (NaN) are dropped to ensure the IsolationForest model works effectively.

### Valid Currencies and Metrics

The system supports the following financial indicators for anomaly detection:

- Currency and Commodity Indices:

    - XAU BGNL Curncy
    - CRY Index
    - DXY Curncy
    - Cl1 Comdty
    - VIX Index

- Bond Yields:

    - USGG30YR Index (US 30-Year Treasury Bond Yield)
    - GT10 Govt
    - USGG2YR Index (US 2-Year Treasury Bond Yield)
    - USGG3M Index (US 3-Month Treasury Yield)
    - US0001M Index (US 1-Month Treasury Yield)

- European Government Bonds:

    - GTDEM30Y Govt (German 30-Year Treasury Bond Yield)
    - GTDEM10Y Govt (German 10-Year Treasury Bond Yield)
    - GTDEM2Y Govt (German 2-Year Treasury Bond Yield)
    - EONIA Index (Euro Overnight Index Average)

- Italian Corporate Bonds:

    - GTITL30YR Corp (Italian 30-Year Corporate Bond Yield)
    - GTITL10YR Corp (Italian 10-Year Corporate Bond Yield)
    - GTITL2YR Corp (Italian 2-Year Corporate Bond Yield)

- Other Financial Indices:

    - LP01TREU Index (Euro Corporate Index)
    - EMUSTRUU Index (EMU Bond Index)
    - LF94TRUU Index (Global Fixed Income Index)
    - MXUS Index (S&P 500 US Index)


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
project/
├── pages/
│   ├── api/
│   │   ├── strategy.ts           # Backend API handling user requests
│   │   ├── detect_anomalies.py   # Python script for anomaly detection (supports Isolation Forest, PCA, rPCA, and SVM)
│   ├── index.tsx                 # Main Next.js page for user interaction
├── components/
│   ├── AnalysisResult.tsx        # Component to dynamically display analysis results
│   ├── FeatureSelection.tsx      # Component for selecting features
│   ├── ModelSelection.tsx        # Component for selecting models
├── models/
│   ├── IsolationForest.py        # Implementation of Isolation Forest
│   ├── PCA.py                    # Implementation of PCA and robust PCA (rPCA)
│   ├── SVM.py                    # Implementation of SVM for anomaly detection
├── public/
│   ├── assets/                   # Static assets (e.g., images, logos)
├── styles/
│   ├── globals.css               # Global styles for the project
├── tests/
│   ├── api/
│   │   ├── strategy.test.ts      # Jest tests for backend API
│   ├── frontend/
│   │   ├── AnalysisResult.test.tsx  # Jest tests for frontend components
├── utils/
│   ├── anomalyDetection.ts       # Helper functions for anomaly detection
│   ├── validations.ts            # Validation functions for user inputs
├── datasets/
│   ├── FinancialMarketData.csv   # Example dataset for anomaly detection
│   ├── Financial_Distress.csv    # Additional datasets for testing
├── .env                          # Environment variables (e.g., OpenAI API Key)
├── requirements.txt              # Python dependencies
├── package.json                  # Project dependencies and scripts
├── README.md                     # Documentation for the project


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