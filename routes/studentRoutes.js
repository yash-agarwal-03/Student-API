import express from "express";
import mongoose from "mongoose";
import Student from "../models/Student.js";

const StudentRouter = express.Router();

StudentRouter.get("/", (req, res) => {
    return res.status(200).send("Welcome to the Student API Server");
});

StudentRouter.post("/students", async (req, res) => {

    const studentData = req.body;
    try {
        const newStudent = new Student(studentData);
        await newStudent.save();
        console.log("Student added successfully\n");
    }
    catch (err) {
        console.error("Error adding student:", err);
        return res.status(500).json({
            message: "Error adding student",
            error: err.message
        });
    }
    return res.status(201).json({
        message: "Student added successfully",
        student: studentData
    });

});
StudentRouter.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        return res.status(200).json(students);
    } catch (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({
            message: "Error fetching students",
            error: err.message
        });
    }
});

// Get a student by MongoDB _id
StudentRouter.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (err) {
        return res.status(500).json({ message: "Error fetching student", error: err.message });
    }
});

// Update a student
StudentRouter.put("/students/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student updated successfully", student: updatedStudent });
    } catch (err) {
        return res.status(500).json({ message: "Error updating student", error: err.message });
    }
});

// Delete a student
StudentRouter.delete("/students/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: "Error deleting student", error: err.message });
    }
});




export default StudentRouter;
