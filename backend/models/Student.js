import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name must be at most 50 characters long"],
    trim: true
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [1, "Age must be at least 1"],
    max: [120, "Age must be at most 120"]
  },
  class: {
    type: String,
    required: [true, "Class is required"],
    minlength: [1, "Class must be at least 1 character long"],
    maxlength: [20, "Class must be at most 20 characters long"],
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, "Roll number is required"],
    unique: true,
    match: [/^[0-9a-zA-Z]+$/, "Roll number must be alphanumeric"]
  },
  address: {
    type: String,
    maxlength: [100, "Address must be at most 100 characters long"],
    trim: true
  }
},{versionKey: false});

const Student = mongoose.model("Student", studentSchema);

export default Student;