import { Response } from "express";

export function sendCustomError(res: Response, error: any) {
  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }

  //middleware errors
  if (error.message) {
    return res.status(400).json({
      message: error.message,
      success: false,
      error: error.message,
    });
  }

  return res.status(500).json({
    message: "There has been an error while borrowing the book.",
    success: false,
    error: error.message || "Internal Server Error",
  });
}
