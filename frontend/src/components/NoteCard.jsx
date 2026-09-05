import toast from 'react-hot-toast';
import { api } from '../lib/axios.js';
import { Link } from 'react-router';
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/utils.js';

export default function NoteCard({ note, setNotes }) {
  async function handleDelete(e, id) {
    e.preventDefault(); // get rid of the default navigation of the parent

    if (!window.confirm('Are you sure you want to delete this note?')) return;

    try {
      await api.delete(`notes/${note._id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      toast.success('Note deleted successfully.');
    } catch (error) {
      console.log('Error in handleDelete.', error);
      toast.error('Failed to delete note.');
    }
  }

  return (
    <Link
      to={`/note/${note._id}`}
      className='card bg-base-100 shadow-md hover:shadow-xl transition-all border-t-6 border-solid border-primary'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button
              className='btn btn-xs btn-ghost text-error'
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
