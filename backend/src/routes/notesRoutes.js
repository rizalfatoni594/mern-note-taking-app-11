import express from 'express';
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

const notesRoutes = express.Router();

notesRoutes.get('/', getNotes);
notesRoutes.get('/:id', getNote);
notesRoutes.post('/', createNote);
notesRoutes.put('/:id', updateNote);
notesRoutes.delete('/:id', deleteNote);

export { notesRoutes };
