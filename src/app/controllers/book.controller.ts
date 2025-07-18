import express, { Application, Request, Response } from "express";
import { Book } from "../models/book.model";
import { sendCustomError } from "../utils/sendCustomError";

export const bookRoutes = express.Router();

type SORTORDER = "asc" | "desc";

bookRoutes.get("/", async (req: Request, res: Response) => {
  let filter: any = {};
  if (req.query.filter) {
    filter.genre = req.query.filter;
  }

  let sort: any = {};
  const sortOrder = req.query?.sort as SORTORDER;
  const sortBy = req.query?.sortBy;
  if (sortOrder && sortBy && (sortOrder === "asc" || sortOrder === "desc")) {
    sort[sortBy as string] = sortOrder === "asc" ? 1 : -1;
  }

  let limit = parseInt(req.query.limit as string) || 10;

  try {
    const books = await Book.find(filter).sort(sort).limit(limit);
    res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    sendCustomError(res, error);
  }
});

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error) {
    sendCustomError(res, error);
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book found with that ID",
      });
    }
    res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    sendCustomError(res, error);
  }
});

bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book found with that ID",
      });
    }
    res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (error) {
    sendCustomError(res, error);
  }
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "No book found with that ID",
      });
    }
    res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    sendCustomError(res, error);
  }
});

export default bookRoutes;
