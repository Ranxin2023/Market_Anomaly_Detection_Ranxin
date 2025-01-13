import { NextApiRequest, NextApiResponse } from "next";
import handler from "./strategy";
import { spawn } from "child_process";

jest.mock("child_process", () => {
  return {
    spawn: jest.fn(),
  };
});

describe("POST /api/strategy", () => {
  let mockRequest: Partial<NextApiRequest>;
  let mockResponse: Partial<NextApiResponse>;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    mockRequest = {
      method: "POST",
      body: { features: ["DXY Curncy", "JPY Curncy"] },
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jsonMock,
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return a 400 error if features are not provided", async () => {
    mockRequest.body = {};
    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid input data" });
  });

  it("should return a 200 response with valid results", async () => {
    const mockPythonProcess = {
      stdout: {
        on: jest.fn((event, callback) => {
          if (event === "data") {
            callback(
              JSON.stringify([
                {
                  column: "DXY Curncy",
                  isAnomaly: true,
                  strategy: "Reduce risk exposure",
                  anomalyDetails: "52, 57, 64",
                },
              ])
            );
          }
        }),
      },
      stderr: {
        on: jest.fn(),
      },
      on: jest.fn((event, callback) => {
        if (event === "close") callback(0);
      }),
    };

    (spawn as jest.Mock).mockReturnValue(mockPythonProcess);

    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith([
      {
        column: "DXY Curncy",
        isAnomaly: true,
        strategy: "Reduce risk exposure",
        anomalyDetails: "52, 57, 64",
      },
    ]);
  });

  it("should return a 500 error if Python script fails", async () => {
    const mockPythonProcess = {
      stdout: {
        on: jest.fn(),
      },
      stderr: {
        on: jest.fn((event, callback) => {
          if (event === "data") callback("Python Error");
        }),
      },
      on: jest.fn((event, callback) => {
        if (event === "close") callback(1);
      }),
    };

    (spawn as jest.Mock).mockReturnValue(mockPythonProcess);

    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Anomaly detection failed" });
  });

  it("should return a 405 error for methods other than POST", async () => {
    mockRequest.method = "GET";
    await handler(mockRequest as NextApiRequest, mockResponse as NextApiResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(405);
    // expect(mockResponse.end).toHaveBeenCalledWith("Method GET Not Allowed. Use POST instead.");
    expect(jsonMock).toHaveBeenCalledWith({ error: "Method GET Not Allowed. Use POST instead." });
  });
});
