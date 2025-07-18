import mongoose, { Model } from "mongoose";

export interface IBORROW {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

export interface IBORROWUPDATE extends Model<IBORROW> {
  updateAvailability(id: mongoose.Types.ObjectId): void;
}
