import { useEffect, useState } from 'react';
import { api } from '../lib/axios.js';
import toast from 'react-hot-toast';
import NavBar from '../components/NavBar.jsx';
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import NotesNotFound from '../components/NotesNotFound.jsx';
import NoteCard from '../components/NoteCard.jsx';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error in fetchNotes.', error);

        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <>
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div>Loading notes ⏳</div>}
      </div>

      {notes.length === 0 && !isRateLimited && <NotesNotFound />}
      {notes.length > 0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </>
  );
}
