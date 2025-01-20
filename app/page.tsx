"use client";
import { useState } from "react";
import Image from "next/image";

// Predefined valid options
const VALID_CURRENCIES = [
  "XAU BGNL Curncy",
  "CRY Index",
  "DXY Curncy",
  "BDIY Index",
  "JPY Curncy",
  "GBP Curncy",
  "Cl1 Comdty",
  "VIX Index",
  "USGG30YR Index",
  "GT10 Govt",
  "USGG2YR Index",
  "USGG3M Index",
  "US0001M Index",
  "GTDEM30Y Govt",
  "GTDEM10Y Govt",
  "GTDEM2Y Govt",
  "EONIA Index"
];
const VALID_MODELS = ["PCA", "IsolationForest", "SVM"];

export default function Home() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null); // Only one model
  const [IFresult, setIFResult] = useState<
    { feature: string; model: string; anomalies_count: number; explanation: string }[]
  >([]);
  const [PCAresult, setPCAResult] = useState<
    { feature: string; model: string; explained_variance_ratio: number; explanation: string }[]
  >([]);
  const [SVMresult, setSVMResult] = useState<
    { feature: string; model: string; anomalies_count: number; explanation: string }[]
  >([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleFeatureSelection = (currency: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(currency) ? prev.filter((item) => item !== currency) : [...prev, currency]
    );
  };

  const selectModel = (model: string) => {
    setSelectedModel(model); // Set only one model at a time
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (selectedFeatures.length === 0 || !selectedModel) {
      setError("Please select at least one feature and one model.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          features: selectedFeatures,
          models: [selectedModel],
        }),
      });

      const data = await response.json();

      if (selectedModel === "IsolationForest") {
        setIFResult(data);
        setPCAResult([]); // Clear PCA results
        setSVMResult([]); // Clear PCA results
      } else if (selectedModel === "PCA") {
        setPCAResult(data);
        setIFResult([]); // Clear Isolation Forest results
        setSVMResult([]); // Clear Isolation Forest results
      }
      else if(selectedModel==='SVM'){
        setSVMResult(data);
        setIFResult([]); // Clear Isolation Forest results
        setPCAResult([]); // Clear Isolation Forest results
        
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      setError("Failed to analyze. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold text-center">Financial Anomaly Detection</h1>
        <p className="text-center text-sm sm:text-left">
          Select transaction features and a model to analyze for anomalies or variance explanation.
        </p>

        {/* Selection Guide */}
        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Available Currency Features:</p>
          <div className="flex flex-wrap gap-2">
            {VALID_CURRENCIES.map((currency) => (
              <span
                key={currency}
                onClick={() => toggleFeatureSelection(currency)}
                className={`px-2 py-1 rounded border cursor-pointer ${
                  selectedFeatures.includes(currency) ? "bg-blue-300 border-blue-600" : "bg-white"
                }`}
              >
                {currency}
              </span>
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Select a Model:</p>
          <div className="flex flex-wrap gap-2">
            {VALID_MODELS.map((model) => (
              <span
                key={model}
                onClick={() => selectModel(model)}
                className={`px-2 py-1 rounded border cursor-pointer ${
                  selectedModel === model ? "bg-green-300 border-green-600" : "bg-white"
                }`}
              >
                {model}
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center sm:items-start w-full max-w-lg">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            {loading ? "Processing..." : "Analyze"}
          </button>
        </form>

        {/* Result Display */}
        {(IFresult.length > 0 || PCAresult.length > 0 || SVMresult.length > 0) && (
          <div className="mt-8 p-4 border border-gray-300 rounded bg-gray-50 w-full max-w-7xl">
            <h2 className="text-lg font-semibold">Analysis Result:</h2>

            {IFresult.length > 0 &&
              IFresult.map((entry, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-md font-bold">{entry.feature} ({entry.model})</h3>
                  <p>
                    <strong>Anomalies Count:</strong> {entry.anomalies_count}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {entry.explanation}
                  </p>
                </div>
              ))}

            {PCAresult.length > 0 &&
              PCAresult.map((entry, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-md font-bold">{entry.feature} ({entry.model})</h3>
                  <p>
                    <strong>Explained Variance Ratio:</strong> {entry.explained_variance_ratio}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {entry.explanation}
                  </p>
                </div>
              ))}

            {SVMresult.length > 0 &&
              SVMresult.map((entry, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-md font-bold">{entry.feature} ({entry.model})</h3>
                  <p>
                    <strong>Anomalies Count:</strong> {entry.anomalies_count}
                  </p>
                  <p>
                    <strong>Explanation:</strong> {entry.explanation}
                  </p>
                </div>
              ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
