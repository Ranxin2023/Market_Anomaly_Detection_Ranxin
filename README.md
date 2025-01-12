# Financial Anomaly Detection
This is a web-based application for detecting financial anomalies using machine learning. The project integrates a Next.js frontend, a Node.js backend, and a Python-based anomaly detection engine using the Isolation Forest algorithm.
## Features
1. User-friendly interface for entering financial data columns.
2. Anomaly detection powered by a machine learning model.
3. Customizable strategies for financial data analysis.
4. Integration between Next.js, Node.js, and Python.
5. Outputs optimized strategies based on detected anomalies.

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