const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");


// POST - create note
router.post("/", noteController.createNote);

// GET - fetch all notes
router.get("/", noteController.getAllNotes);

router.get("/:id", noteController.getNoteById);

router.patch("/:id", noteController.updateNote);

module.exports = router;