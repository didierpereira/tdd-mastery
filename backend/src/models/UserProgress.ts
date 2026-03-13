/**
 * User Progress Model - MongoDB Schema with Mongoose
 */

import mongoose, { Schema, Document } from "mongoose";

export interface IUserProgress extends Document {
  userId: string;
  moduleId: string;
  moduleType: "quiz" | "challenge";
  score: number;
  passed: boolean;
  completedAt: Date;
  attempts: number;
  lastAttemptAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    moduleId: {
      type: String,
      required: true,
    },
    moduleType: {
      type: String,
      enum: ["quiz", "challenge"],
      required: true,
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    passed: {
      type: Boolean,
      required: true,
    },
    completedAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    lastAttemptAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient queries
UserProgressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

export const UserProgress = mongoose.model<IUserProgress>(
  "UserProgress",
  UserProgressSchema
);
