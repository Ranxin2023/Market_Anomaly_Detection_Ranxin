import { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { features, models } = req.body; // Expect both 'features' and 'models' in the POST request body
    console.log("Features received:", features);
    console.log("Models received:", models);

    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: "Invalid input: 'features' must be a non-empty array." });
    }

    if (!models || !Array.isArray(models)) {
      return res.status(400).json({ error: "Invalid input: 'models' must be a non-empty array." });
    }

    // Use Python to process the input features and models
    const pythonProcess = spawn("python", [
      "pages/api/detect_anomalies.py", 
      JSON.stringify(features), 
      JSON.stringify(models)
    ]);

    let result = "";
    let errorOutput = "";

    // Capture Python script's stdout
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    // Capture Python script's stderr
    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    // Handle script completion
    pythonProcess.on("close", (code) => {
      console.log("Python script exited with code:", code);

      if (code === 0) {
        try {
          console.log("Raw result from Python script:", result);
          const parsedResult = JSON.parse(result.trim()); // Parse Python's JSON output
          console.log("Parsed result:", parsedResult);
          res.status(200).json(parsedResult);
        } catch (error) {
          console.error("JSON Parse Error:", error, "Raw Output:", result);
          res.status(500).json({ error: "Failed to parse Python script output." });
        }
      } else {
        console.error("Python Script Error Output:", errorOutput);
        res.status(500).json({ error: "Anomaly detection failed.", details: errorOutput });
      }
    });

    // Handle process errors
    pythonProcess.on("error", (error) => {
      console.error("Failed to start Python script:", error);
      res.status(500).json({ error: "Failed to execute Python script.", details: error.message });
    });
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed. Use POST instead.` });
  }
}
