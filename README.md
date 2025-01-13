# Financial Anomaly Detection
This is a web-based application for detecting financial anomalies using machine learning. The project integrates a Next.js frontend, a Node.js backend, and a Python-based anomaly detection engine using the Isolation Forest algorithm.
## Features
1. Anomaly Detection:

Uses the Isolation Forest algorithm, a tree-based, unsupervised machine learning model, to identify anomalies in financial datasets.

Detects irregularities in numerical features of financial transactions.

2. Unsupervised Learning:

The Isolation Forest algorithm operates in an unsupervised fashion, meaning it does not require labeled data.

It identifies anomalies by measuring how "isolated" a point is in the feature space, making it ideal for detecting rare or unusual events in datasets.

3. Dynamic Frontend:

Built using Next.js, a React framework for server-rendered applications.

Features an intuitive interface where users can input features and view analysis results dynamically.

4. Backend-Python Integration:

The backend uses Node.js and leverages the spawn function to run Python scripts that execute the Isolation Forest model.

Results from Python are parsed and returned to the frontend for display.

5. Testing Framework:

Employs Jest for unit testing, ensuring robust and reliable backend and frontend functionality.
## Tech Used
1. Isolation Forest

Concept:

Isolation Forest is an unsupervised learning algorithm specifically designed for anomaly detection.

It isolates anomalies by constructing random decision trees and identifying points that require fewer splits to be isolated.

Role in the Project:

Used to analyze numerical features in the dataset and detect outliers that represent financial anomalies.

Provides actionable insights, such as recommending "Reduce risk exposure" for anomalous data points.

2. Unsupervised Learning and Anomalies

Unsupervised Learning:

Refers to machine learning tasks where the algorithm is not provided with explicit labels.

The algorithm infers patterns and structures from the data itself.

Anomaly Detection:

Identifies rare events or data points that deviate significantly from the majority of the data.

Critical in financial applications to flag irregular transactions or market anomalies.

3. spawn Module

Concept:

A Node.js module used to create child processes and execute external commands or scripts.

Provides a way to communicate between Node.js applications and external scripts (e.g., Python).

Role in the Project:

Facilitates the execution of the detect_anomalies.py script from the Node.js backend.

Captures output from the Python script and processes it for the frontend.

4. Next.js

Concept:

A powerful React-based framework that enables server-side rendering and static site generation.

Role in the Project:

Builds the user interface for anomaly detection.

Handles client-server communication and dynamically updates the analysis results.

5. Jest

Concept:

A JavaScript testing framework designed for simplicity and performance.

Role in the Project:

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
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Project Structure
```graphql
financial-anomaly-detection/
├── app/
│   ├── pages/
│   │   ├── api/
│   │   │   ├── strategy.ts         # Backend API for anomaly detection
│   │   │   └── detect_anomalies.py # Python script for ML processing
│   │   └── page.tsx                # Frontend homepage
│   ├── utils/
│   │   └── anomalyDetection.ts     # Utility functions
├── public/                         # Static assets
├── FinancialMarketData.csv         # Dataset for training and prediction
├── README.md                       # Project documentation
├── package.json                    # Node.js dependencies
├── requirements.txt                # Python dependencies
├── tsconfig.json                   # TypeScript configuration
└── tailwind.config.js              # Tailwind CSS configuration

```

# How it works
1. Frontend: Accepts user inputs (column names) for anomaly detection.
2. Backend:
- Processes requests and communicates with the Python script.
- Sends responses back to the frontend.
3. Python Script:
- Uses Isolation Forest to analyze the dataset.
- Outputs whether the data contains anomalies and suggests a financial strategy.