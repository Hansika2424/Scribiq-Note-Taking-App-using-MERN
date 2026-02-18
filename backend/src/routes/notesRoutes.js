import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesControllers.js";


const router = express.Router();


router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
// router.get("/", (req, res) => {
//   res.status(200).send("You just fetch the notes")
// })

// router.post("/", (req, res) => {
//   res.status(201).json({message: "post created successfully"})
// })

// router.put("/:id", (req, res) => {
//   res.status(200).json({message: "post created successfully"})
// })

// router.delete("/:id", (req, res) => {
//   res.status(200).json({message: "post created successfully"})
// })



