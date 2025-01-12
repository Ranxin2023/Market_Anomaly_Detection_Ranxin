import { NextApiRequest, NextApiResponse } from "next";
import { calculateAnomaly } from "../../utils/anomalyDetection";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { features } = req.body;

    if (!features || !Array.isArray(features)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const result = calculateAnomaly(features);
    return res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
