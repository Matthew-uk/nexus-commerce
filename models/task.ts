import mongoose, { Schema, Document } from "mongoose";

// Define the Task interface
interface ITask extends Document {
  taskName: string;
  taskPlatform: string;
  taskLink: string;
  taskDescription: string;
}

// Create the Task schema
const TaskSchema: Schema = new Schema(
  {
    taskName: { type: String, required: true },
    taskPlatform: {
      type: String,
      enum: ["twitter", "instagram", "facebook"],
      required: true,
    },
    taskLink: { type: String, required: true },
    taskDescription: { type: String, required: true },
  },
  { timestamps: true },
);

const Task = mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);

export default Task;
