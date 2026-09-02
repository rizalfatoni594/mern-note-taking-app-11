import mongoose from 'mongoose';
import { Note } from '../models/Note.js';

// get all notes
async function getNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.log('Error in getNotes controller.', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// get a single note
async function getNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note id.' });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log('Error in getNote controller.', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// create a note
async function createNote(req, res) {
  try {
    const { title, content } = req.body;

    const newNote = await Note.create({ title, content });

    res.status(201).json(newNote);
  } catch (error) {
    console.log('Error in createNote controller.', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// update a note
async function updateNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note id.' });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log('Error in updateNote controller.', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

// delete a note
async function deleteNote(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid note id.' });
    }

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found.' });
    }

    res.status(200).json(note);
  } catch (error) {
    console.log('Error in deleteNote controller.', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

export { getNotes, getNote, createNote, updateNote, deleteNote };
