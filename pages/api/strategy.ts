import { NextApiRequest, NextApiResponse } from "next";
import { spawn } from "child_process";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { features } = req.body;
    console.log("Features received", features)
    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Use Python to process the Excel file and detect anomalies
    const pythonProcess = spawn("python", ["pages/api/detect_anomalies.py", JSON.stringify(features),]);

    let result = "";
    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error("Python Error:", data.toString());
    });

    pythonProcess.on("close", (code) => {
      console.log("return code is", code)
      if (code === 0) {
        try {
          console.log("result in ts is:\n",result)
          const parsedResult = JSON.parse(result.trim()); // Trim any extra whitespace
          console.log("parsed result is", parsedResult)
          res.status(200).json(parsedResult);
        } catch (error) {
          console.error("JSON Parse Error:", error, "Output:", result);
          res.status(500).json({ error: "Invalid response from Python script" });
        }
      } else {
        res.status(500).json({ error: "Anomaly detection failed" });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
