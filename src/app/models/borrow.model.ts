import mongoose, { model } from "mongoose";
import { IBORROW, IBORROWUPDATE } from "../interfaces/borrow interface";
import { Book } from "./book.model";

let borrowSchema = new mongoose.Schema<IBORROW, IBORROWUPDATE>(
  {
    book: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

borrowSchema.static(
  "updateAvailability",
  async function (id: mongoose.Types.ObjectId) {
    let bookStock = await Book.findById(id, "copies -_id");
    if (bookStock && bookStock.copies <= 0) {
      await Book.findByIdAndUpdate(id, {
        $set: { available: false },
      });
    }
  }
);

borrowSchema.pre("save", async function (next) {
  try {
    let bookStock = await Book.findById(this.book, "copies -_id");
    if (!bookStock) {
      throw new Error("Book not found");
    }

    if (this.quantity > bookStock.copies) {
      throw new Error("Not enough copies available");
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

borrowSchema.post("save", async function (doc) {
  try {
    await Book.findByIdAndUpdate(doc.book, {
      $inc: { copies: -doc.quantity },
    });
    await Borrow.updateAvailability(doc.book);
  } catch (error) {
    console.error("Error updating book copies:", error);
    throw new Error("Error updating book copies");
  }
});

export let Borrow = model<IBORROW, IBORROWUPDATE>("borrow", borrowSchema);
