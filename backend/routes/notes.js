const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const { default: mongoose } = require("mongoose");
const router = express.Router();

// Route 1: Get all the notes using: GET "/api/notes/fetchallnotes" login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Route 2: Add Notes using: POST "/api/notes/addnote" login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // If there are errors , return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
);

// Route 3: Update an existing using: PUT "/api/notes/updatenote"  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // create a new note
    const newNote = {};

    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated and update it
    const note = await Notes.findById(mongoose.Types.ObjectId(req.params.id));
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.send(updatedNote);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Route 4: Delete an existing using: DELETE "/api/notes/deletenote"  login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  // Find the note to be deleted and delete it
  try {
    let note = await Notes.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    let deletedNote = await Notes.findByIdAndDelete(
     req.params.id
    );
    res.json({ success: "Note deleted successfully", note: deletedNote });

  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
